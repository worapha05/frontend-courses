# Level 1 — Beginner: Svelte Core & True Reactivity

เป้าหมายระดับนี้: ให้คุณเข้าใจ **Compiler-first Architecture** และ **ระบบ Reactivity ของ Svelte 5** จริง ๆ
ไม่ใช่แค่เรียก `$state()` — เพื่อออกแบบ UI ที่ predict ได้ มี overhead ต่ำ และ data flow ชัด

---

## สารบัญ

1. [Compiler vs Virtual DOM](#1-compiler-vs-virtual-dom)
2. [Reactivity System — จาก Assignment สู่ Runes](#2-reactivity-system--จาก-assignment-สู่-runes)
3. [Data Flow ใน Svelte](#3-data-flow-ใน-svelte)
4. [Templating & Logic Blocks](#4-templating--logic-blocks)
5. [Components, Props, Snippets](#5-components-props-snippets)
6. [DOM Events](#6-dom-events)
7. [Best Practices สรุป](#7-best-practices-สรุป)

---

## 1. Compiler vs Virtual DOM

### 1.1 กระบวนทัศน์ที่ต่างกัน

| แนวคิด                         | React / Vue (runtime-heavy)             | Svelte (compiler-first)                         |
| ------------------------------ | --------------------------------------- | ----------------------------------------------- |
| เมื่อไหร่รู้ว่า UI ต้องเปลี่ยน | Runtime เทียบ Virtual DOM / Proxy track | Compile-time สร้างโค้ด update ตรงจุด            |
| สิ่งที่ส่งไป production        | Framework runtime + app code            | โค้ดที่ compile แล้ว + runtime เล็กมาก          |
| Update strategy                | Diff tree → patch DOM                   | Imperative statements update node ที่เกี่ยวข้อง |

```
┌─────────────────────────────────────────────────────────────┐
│ Your .svelte source     │
│ let count = $state(0)     │
│ <button onclick={() => count++}>{count}</button>  │
└──────────────────────────┬──────────────────────────────────┘
    │ svelte compile (build time)
    ▼
┌─────────────────────────────────────────────────────────────┐
│ Generated JS      │
│ - สร้าง text node / button ครั้งเดียวตอน mount  │
│ - เมื่อ count เปลี่ยน → update textContent โดยตรง  │
│ - ไม่มี virtual tree ที่ต้อง diff ทุกครั้ง   │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 “Zero-runtime overhead” หมายความว่าอะไร

ไม่ได้แปลว่า **ไม่มี JavaScript เลย** — แต่หมายความว่า:

1. **ไม่มี Virtual DOM reconciler** ที่ทำงานทุก state change
2. **งานวิเคราะห์ dependency** ส่วนใหญ่ถูกทำตอน compile
3. Bundle ของ component มักเล็กกว่า เพราะไม่ต้อง ship framework ขนาดใหญ่

ข้อแลกเปลี่ยนที่ควรรู้:

- Compile step เข้มงวดกว่า — syntax ผิดจะ fail ตอน build
- Mental model ต้องเข้าใจว่า “โค้ดที่คุณเขียน ≠ โค้ดที่รัน” (มี transform)

ดูตัวอย่างเปรียบเทียบ: [`examples/01-compiler-reactivity/`](./examples/01-compiler-reactivity/)

---

## 2. Reactivity System — จาก Assignment สู่ Runes

### 2.1 Svelte 4: Assignment เป็น trigger

ใน Svelte 4 การ **กำหนดค่าด้วย `=`** เป็นสัญญาณให้ compiler สร้างโค้ด update:

```svelte
<script>
 let count = 0;
 // count++ → compile เป็น count = count + 1 พร้อม invalidate
 function inc() {
 count += 1;
 }

 // Reactive declaration — คำนวณใหม่เมื่อ dependency เปลี่ยน
 $: doubled = count * 2;

 // Reactive statement — side effect เมื่อ dependency เปลี่ยน
 $: console.log('count is', count);
</script>
```

ข้อจำกัดของ `$:`:

- ดูเหมือน “magic” — อ่าน dependency จาก AST
- ใช้กับ TypeScript / tooling ได้ไม่ลื่นเท่า runes
- ขอบเขต reactivity กว้างเกินได้ง่ายในไฟล์ใหญ่

### 2.2 Svelte 5 Runes — สัญญาณ reactivity ที่ชัดเจน

Svelte 5 แนะนำ **Runes** เป็น primitive ของ reactivity:

| Rune       | บทบาท                                | เทียบเคียงแนวคิด            |
| ---------- | ------------------------------------ | --------------------------- |
| `$state`   | แหล่งความจริงที่เปลี่ยนแปลงได้       | `ref` / `useState`          |
| `$derived` | ค่าที่คำนวณจาก state อื่น (memoize)  | `computed` / `useMemo`      |
| `$effect`  | side effect เมื่อ dependency เปลี่ยน | `watchEffect` / `useEffect` |
| `$props`   | รับ props แบบ reactive               | `defineProps`               |
| `$inspect` | debug ค่า reactive ตอนพัฒนา          | DevTools helper             |

```svelte
<script lang="ts">
 let count = $state(0);
 let doubled = $derived(count * 2);

 $effect(() => {
 console.log('count changed:', count);
 });
</script>

<button onclick={() => count++}>
 {count} → {doubled}
</button>
```

### 2.3 กฎสำคัญของ Runes

1. **`$state` ของ object/array เป็น deep reactive** (proxy) — mutation ภายในก็ trigger ได้
2. **`$derived` ต้อง pure** — ห้ามมี side effect ข้างใน
3. **`$effect` รันหลัง DOM update** — ใช้ cleanup function เมื่อมี subscription / timer
4. **อย่าใช้ `$effect` เพื่อ sync state จาก state** — ใช้ `$derived` แทน

```svelte
<script lang="ts">
 let items = $state<{ id: number; done: boolean }[]>([]);

 // ✅ derived
 let remaining = $derived(items.filter((i) => !i.done).length);

 // ❌ anti-pattern: effect เพื่อคำนวณค่าที่ควรเป็น derived
 // let remaining = $state(0);
 // $effect(() => { remaining = items.filter(...).length });
</script>
```

ดูตัวอย่าง: [`examples/02-runes-state-derived/`](./examples/02-runes-state-derived/)

---

## 3. Data Flow ใน Svelte

```
┌──────────────┐ props / bind: ┌──────────────┐
│ Parent │ ───────────────────▶ │ Child │
│ $state(...) │ ◀─────────────────── │ $props() │
└──────────────┘ callbacks / events └──────────────┘
 │
 │ local UI state อยู่ใกล้ที่สุดที่ใช้
 ▼
 อย่าดึงทุกอย่างขึ้น global store ตั้งแต่แรก
```

หลักการ:

| ชั้น                      | เก็บอะไร                            | ตัวอย่าง                      |
| ------------------------- | ----------------------------------- | ----------------------------- |
| Local `$state`            | UI ชั่วคราวของ component            | open/close modal, input draft |
| Props                     | ค่าที่ parent เป็นเจ้าของ           | `user`, `items`               |
| Callback / bind           | แจ้ง parent ให้เปลี่ยนแหล่งความจริง | `onSave`, `bind:value`        |
| Store / Context (ระดับ 2) | ข้ามหลายชั้นโดยไม่ prop drilling    | theme, auth session           |

---

## 4. Templating & Logic Blocks

### 4.1 `{#if}` / `{:else if}` / `{:else}`

```svelte
{#if status === 'loading'}
 <p>Loading…</p>
{:else if status === 'error'}
 <p class="error">{errorMessage}</p>
{:else}
 <slot /><!-- หรือ {@render children?.()} ใน Svelte 5 -->
{/if}
```

### 4.2 `{#each}` — key สำคัญมาก

```svelte
{#each items as item (item.id)}
 <li>{item.name}</li>
{:else}
 <li>ไม่มีรายการ</li>
{/each}
```

> **Best practice:** ใส่ key ที่เสถียร (`id`) เสมอ — อย่าใช้ index เป็น key ถ้า list reorder/delete ได้

### 4.3 `{#await}` — จัดการ Promise ใน template

```svelte
{#await fetchUser(id)}
 <p>กำลังโหลด…</p>
{:then user}
 <h2>{user.name}</h2>
{:catch error}
 <p>{error.message}</p>
{/await}
```

เหมาะกับ demo / component เล็ก — ในแอปจริงระดับ Intermediate ควรใช้ SvelteKit `load` มากกว่า fetch กระจัดกระจายในทุกหน้า

ดูตัวอย่าง: [`examples/03-templating-components/`](./examples/03-templating-components/)

---

## 5. Components, Props, Snippets

### 5.1 Props ด้วย `$props()`

```svelte
<!-- UserCard.svelte -->
<script lang="ts">
 interface Props {
 name: string;
 role?: string;
 active?: boolean;
 }

 let { name, role = 'member', active = false }: Props = $props();
</script>

<article class:active>
 <h3>{name}</h3>
 <p>{role}</p>
</article>
```

### 5.2 Snippets (แทน slots แบบเก่าในหลายเคส)

Svelte 5 ใช้ **snippets** เป็นกลไกส่งเนื้อหาเข้า component อย่าง type-safe:

```svelte
<!-- Card.svelte -->
<script lang="ts">
 import type { Snippet } from 'svelte';

 let { title, children, footer }: {
 title: string;
 children: Snippet;
 footer?: Snippet;
 } = $props();
</script>

<section>
 <h2>{title}</h2>
 {@render children()}
 {#if footer}
 <footer>{@render footer()}</footer>
 {/if}
</section>
```

```svelte
<!-- Parent -->
<Card title="ออเดอร์">
 <p>รายละเอียด…</p>
 {#snippet footer()}
 <button>ยืนยัน</button>
 {/snippet}
</Card>
```

Slots แบบเก่า (`<slot />`) ยังใช้ได้เพื่อความเข้ากันได้ แต่ project ใหม่แนะนำ snippets

ดูตัวอย่าง: [`examples/04-events-snippets/`](./examples/04-events-snippets/)

---

## 6. DOM Events

ใน Svelte 5 แนะนำใช้ property ของ element โดยตรง:

```svelte
<script lang="ts">
 function handleClick(e: MouseEvent) {
 console.log((e.currentTarget as HTMLButtonElement).dataset.id);
 }
</script>

<button data-id="42" onclick={handleClick}>Click</button>
<input oninput={(e) => console.log(e.currentTarget.value)} />
```

| รูปแบบ                                     | หมายเหตุ                            |
| ------------------------------------------ | ----------------------------------- |
| `onclick={fn}`                             | ชัดเจน ทำงานกับ TypeScript ดี       |
| `onclick={() => ...}`                      | เหมาะกับ inline สั้น ๆ              |
| Event modifiers (`once`, `preventDefault`) | ใช้ผ่าน wrapper หรือเรียกใน handler |

---

## 7. Best Practices สรุป

1. **ใช้ `$state` สำหรับแหล่งความจริงเดียว** — derived ค่าอื่นด้วย `$derived`
2. **`$effect` = I/O / subscription เท่านั้น** ไม่ใช่ที่คำนวณค่า
3. **ใส่ key ใน `{#each}`** เสมอเมื่อ item มี identity
4. **Props เป็น read-only ตามสัญญา** — เปลี่ยนผ่าน callback หรือ `bind:`
5. **เริ่มจาก local state** — อย่าสร้าง store ก่อนจำเป็น
6. **อ่านโค้ดที่ compile ออกมาบ้าง** (Svelte REPL / Vite plugin inspect) เพื่อเข้าใจ overhead จริง

---

## Checklist ก่อนขึ้น Intermediate

- [ ] อธิบายได้ว่า Svelte ต่างจาก VDOM อย่างไร
- [ ] ใช้ `$state` / `$derived` / `$effect` ถูกบทบาท
- [ ] สร้าง component ที่รับ props + snippets ได้
- [ ] เขียน `{#if}` / `{#each}` / `{#await}` ได้อย่างมั่นใจ
- [ ] ทำ Lab Beginner จบด้วยตัวเอง

ถัดไป: [`../02-intermediate/`](../02-intermediate/)
