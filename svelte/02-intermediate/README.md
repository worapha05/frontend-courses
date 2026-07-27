# Level 2 — Intermediate: Advanced Svelte & SvelteKit Essentials

เป้าหมายระดับนี้: ยกระดับจาก component เดี่ยวไปสู่ **แอปที่มี state ข้ามชั้น, animation, และ fullstack routing** ด้วย SvelteKit
โฟกัสที่ Stores / Context, Lifecycle & Transitions, และ Form Actions ที่สะอาด

---

## สารบัญ

1. [State Management — Stores & Context](#1-state-management--stores--context)
2. [Lifecycle & Transitions](#2-lifecycle--transitions)
3. [SvelteKit — File-based Routing](#3-sveltekit--file-based-routing)
4. [Data Loading ด้วย `load`](#4-data-loading-ด้วย-load)
5. [Form Actions](#5-form-actions)
6. [Best Practices สรุป](#6-best-practices-สรุป)

---

## 1. State Management — Stores & Context

### 1.1 เมื่อไหร่ใช้ Store vs Local `$state`

| สถานการณ์                                    | เลือก                       |
| -------------------------------------------- | --------------------------- |
| State ใช้ใน component เดียว                  | `$state` ในไฟล์นั้น         |
| แชร์ข้าม sibling ที่ห่างกันโดยไม่ prop drill | Svelte store หรือ context   |
| ต้อง subscribe นอก component (module)        | `writable` / custom store   |
| Theme / locale ที่ subtree ใช้ร่วมกัน        | `setContext` / `getContext` |

ใน Svelte 5 คุณยังใช้ stores ได้เต็มที่ และสามารถห่อด้วย runes ใน `.svelte.ts` ได้ตามสะดวก

### 1.2 Writable / Readable / Derived

```ts
import { writable, readable, derived } from 'svelte/store';

export const count = writable(0);

export const doubled = derived(count, ($c) => $c * 2);

export const clock = readable(new Date(), (set) => {
  const id = setInterval(() => set(new Date()), 1000);
  return () => clearInterval(id);
});
```

ใน component:

```svelte
<script lang="ts">
  import { count, doubled } from '$lib/stores';
</script>

<!-- auto-subscribe ด้วย $ prefix -->
<p>{$count} → {$doubled}</p>
<button onclick={() => count.update((n) => n + 1)}>+1</button>
```

### 1.3 Custom Store

```ts
import { writable } from 'svelte/store';

function createCart() {
  const { subscribe, update, set } = writable<{ id: string; qty: number }[]>([]);

  return {
    subscribe,
    add(id: string) {
      update((items) => {
        const found = items.find((i) => i.id === id);
        if (found) return items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
        return [...items, { id, qty: 1 }];
      });
    },
    clear: () => set([]),
  };
}

export const cart = createCart();
```

### 1.4 Context API

```ts
// parent
import { setContext } from 'svelte';
setContext('theme', { mode: 'dark' });

// child (ลึกกี่ชั้นก็ได้ใน subtree)
import { getContext } from 'svelte';
const theme = getContext<{ mode: string }>('theme');
```

> Context ไม่ใช่ global reactive store โดยตัว alone — ถ้าค่าต้อง reactive ให้ใส่ `$state` object หรือ store ลงใน context

ดูตัวอย่าง: [`examples/01-stores-context/`](./examples/01-stores-context/)

---

## 2. Lifecycle & Transitions

### 2.1 Hooks สำคัญ

| Hook        | เมื่อไหร่รัน                     | ใช้ทำอะไร                              |
| ----------- | -------------------------------- | -------------------------------------- |
| `onMount`   | หลัง component เข้า DOM (client) | fetch ที่ต้อง browser-only, init chart |
| `onDestroy` | ก่อนถอดออก                       | cleanup timer / subscription           |
| `tick`      | รอ DOM sync รอบถัดไป             | focus input หลัง render                |

```svelte
<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';

  let inputEl: HTMLInputElement | undefined = $state();

  onMount(() => {
    const id = setInterval(() => {}, 1000);
    return () => clearInterval(id); // cleanup ของ onMount
  });

  async function focusNext() {
    await tick();
    inputEl?.focus();
  }
</script>
```

ใน Svelte 5, `$effect` ครอบคลุมหลายเคสของ lifecycle ฝั่ง reactive — แต่ `onMount` ยังเหมาะกับ “รันครั้งเดียวตอน mount ฝั่ง client”

### 2.2 Transitions & Motion

```svelte
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  let visible = $state(true);
  const progress = tweened(0, { duration: 400, easing: cubicOut });
</script>

{#if visible}
  <div transition:fly={{ y: 20, duration: 200 }} in:fade>
    Hello
  </div>
{/if}
```

หลักการใช้ motion ให้มี “presence” ไม่ใช่ noise:

- ใช้ transition ตอนเข้า/ออกของ panel สำคัญ
- ใช้ `tweened`/`spring` กับค่าตัวเลขที่ผู้ใช้ควรเห็นการเปลี่ยน
- อย่า animate ทุก list item พร้อมกันแบบสุ่ม

ดูตัวอย่าง: [`examples/02-lifecycle-transitions/`](./examples/02-lifecycle-transitions/)

---

## 3. SvelteKit — File-based Routing

โครงสร้างหลัก:

```
src/
 routes/
 +layout.svelte  # layout ร่วม
 +layout.server.ts # load ร่วมฝั่ง server (optional)
 +page.svelte  # หน้า /
 +page.ts  # universal load
 +page.server.ts  # server-only load / actions
 about/+page.svelte # /about
 products/
 [id]/+page.svelte # /products/:id
 api/
 hello/+server.ts # API endpoint
 lib/   # shared modules ($lib)
 hooks.server.ts  # (Expert) middleware-like hooks
```

| ไฟล์              | บทบาท                                       |
| ----------------- | ------------------------------------------- |
| `+page.svelte`    | UI ของ route                                |
| `+layout.svelte`  | ห่อ children หลายหน้า                       |
| `+page.ts`        | `load` ที่รันได้ทั้ง server และ browser     |
| `+page.server.ts` | `load` / `actions` ที่รันบน server เท่านั้น |
| `+server.ts`      | REST-like endpoints (`GET`/`POST`/…)        |

ดูตัวอย่าง: [`examples/03-sveltekit-routing-load/`](./examples/03-sveltekit-routing-load/)

---

## 4. Data Loading ด้วย `load`

### 4.1 Server load

```ts
// src/routes/products/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
  const products = await db.listProducts();
  return { products };
};
```

```svelte
<!-- +page.svelte -->
<script lang="ts">
  let { data } = $props();
</script>

{#each data.products as p (p.id)}
  <a href={`/products/${p.id}`}>{p.name}</a>
{/each}
```

### 4.2 Universal vs Server

| ชนิด      | ไฟล์              | เข้าถึง secrets / DB ได้? | รันที่ไหน                             |
| --------- | ----------------- | ------------------------- | ------------------------------------- |
| Universal | `+page.ts`        | ไม่ควร                    | server ตอน SSR + browser ตอน navigate |
| Server    | `+page.server.ts` | ได้                       | server เท่านั้น                       |

กฎง่าย ๆ: **ถ้าต้องใช้ env secret หรือ ORM → `.server.ts` เสมอ**

### 4.3 Invalidation & dependency

เมื่อข้อมูลเปลี่ยนหลัง form / action ให้ใช้ `applyAction`, `enhance`, หรือ `invalidateAll()` / `invalidate('custom:key')` ตาม dependency ที่ประกาศใน `load` (`depends`)

---

## 5. Form Actions

Form Actions คือวิธีทำ mutation แบบ progressive enhancement โดยไม่ต้องเขียน API แยกทุกครั้ง

```ts
// +page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  create: async ({ request }) => {
    const fd = await request.formData();
    const title = String(fd.get('title') ?? '').trim();
    if (!title) return fail(400, { title, missing: true });

    await db.createTask(title);
    // ไม่ redirect ก็ได้ — จะกลับไปหน้าเดิมพร้อม data ใหม่หลัง invalidate
    return { success: true };
  },

  delete: async ({ request }) => {
    const id = String((await request.formData()).get('id'));
    await db.deleteTask(id);
    return { success: true };
  },
};
```

```svelte
<script lang="ts">
  import { enhance } from '$app/forms';
  let { form } = $props();
</script>

<form method="POST" action="?/create" use:enhance>
  <input name="title" value={form?.title ?? ''} />
  {#if form?.missing}<p>กรุณากรอกชื่อ</p>{/if}
  <button>สร้าง</button>
</form>
```

จุดแข็ง:

1. ทำงานได้แม้ JS โหลดไม่ทัน (progressive enhancement)
2. Validation error ส่งกลับผ่าน `fail` แบบ type-safe
3. คู่กับ `use:enhance` ได้ UX แบบ SPA โดยไม่ทิ้ง fundamentals ของ HTML form

ดูตัวอย่าง: [`examples/04-form-actions/`](./examples/04-form-actions/)

---

## 6. Best Practices สรุป

1. **Store สำหรับข้ามหน้า/ข้าม subtree** — local `$state` สำหรับ UI ชั่วคราว
2. **Context ส่ง dependency ลง subtree** — ไม่ใช้แทน database
3. **`load` เป็นทางเข้าข้อมูลหลักของหน้า** — อย่า fetch ซ้ำใน `onMount` โดยไม่มีเหตุผล
4. **Form Actions สำหรับ mutation ของหน้า** — API `+server.ts` สำหรับ client อื่น / webhook
5. **แยก `$lib/server`** — ห้าม import เข้า client component
6. **Transition มีจุดประสงค์** — อย่างน้อย 2–3 จังหวะที่สื่อ hierarchy ไม่ใช่ทุก element

---

## Checklist ก่อนขึ้น Expert

- [ ] สร้าง custom store และใช้ `$store` auto-subscribe ได้
- [ ] ใช้ context ส่ง theme/session ลง subtree
- [ ] ออกแบบ routes + layout ของ SvelteKit ได้
- [ ] เขียน `load` แยก server/universal ถูกที่
- [ ] ทำ Form Actions + `enhance` + `fail` ได้
- [ ] ทำ Lab Intermediate จบด้วยตัวเอง

ถัดไป: [`../03-expert/`](../03-expert/)
