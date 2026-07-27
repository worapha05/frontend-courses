# Level 1 — Beginner: Vue 3 Composition API & Reactivity

เป้าหมายระดับนี้: ให้คุณเข้าใจ **กลไก Reactivity ของ Vue 3** จริง ๆ
ไม่ใช่แค่เรียก `ref()` — เพื่อออกแบบ component ที่ predict ได้และไม่ leak effect

---

## สารบัญ

1. [ทำไมต้องเข้าใจ Reactivity System](#1-ทำไมต้องเข้าใจ-reactivity-system)
2. [`ref` vs `reactive`](#2-ref-vs-reactive)
3. [`computed` — Derived State ที่ Memoize](#3-computed--derived-state-ที่-memoize)
4. [`watch` / `watchEffect` — Side Effects](#4-watch--watcheffect--side-effects)
5. [Component Architecture](#5-component-architecture)
6. [Directives, Forms และ Lifecycle](#6-directives-forms-และ-lifecycle)
7. [Best Practices สรุป](#7-best-practices-สรุป)

---

## 1. ทำไมต้องเข้าใจ Reactivity System

Vue 3 ใช้ **ES Proxy** ติดตามการอ่าน/เขียนค่า แล้ว re-run เฉพาะ effect ที่ depend ค่านั้น

```
┌──────────────────────────────────────────────────┐
│ Template / Computed / Watch / watchEffect │
│ (= Reactive Effects)    │
└───────────────────┬──────────────────────────────┘
   │ track() เมื่ออ่าน .value / property
   ▼
┌──────────────────────────────────────────────────┐
│ Dependency Map: target → key → Set<effect> │
└───────────────────┬──────────────────────────────┘
   │ trigger() เมื่อเขียนค่า
   ▼
┌──────────────────────────────────────────────────┐
│ Scheduler → queue job → flush (microtask) │
│ → update DOM / re-run computed / call watcher │
└──────────────────────────────────────────────────┘
```

| อาการบั๊กที่พบบ่อย | สาเหตุจริง                                                   |
| ------------------ | ------------------------------------------------------------ |
| UI ไม่ update      | ทำลาย reactivity (destructure `reactive` โดยไม่ใช้ `toRefs`) |
| Watch ยิงซ้ำเกิน   | ไม่มี `flush` / deep watch ทั้ง object ใหญ่                  |
| Memory ค้าง        | ไม่ `stop()` หรือลืม cleanup ใน `onUnmounted`                |
| Props ถูก mutate   | ละเมิด one-way data flow                                     |

ดูตัวอย่างรันได้: [`examples/01-reactivity-ref-reactive/`](./examples/01-reactivity-ref-reactive/)

---

## 2. `ref` vs `reactive`

### 2.1 `ref` — ห่อค่าด้วย `.value`

```js
import { ref } from 'vue';

const count = ref(0);
count.value++; // อ่าน/เขียนผ่าน .value ใน script
// ใน template: {{ count }} — Vue unwrap ให้อัตโนมัติ
```

`ref` เหมาะกับ:

- primitive (`number`, `string`, `boolean`)
- ค่าที่ต้อง **แทนที่ทั้งก้อน** (`user.value = newUser`)
- ส่งต่อระหว่าง composable โดยไม่เสีย reactivity

### 2.2 `reactive` — Proxy object

```js
import { reactive } from 'vue';

const state = reactive({ count: 0, user: { name: 'Ann' } });
state.count++;
state.user.name = 'Bee';
```

กับดักสำคัญ:

```js
// ❌ ทำลาย reactivity
let { count } = state;
count++; // ไม่ trigger อะไร

// ✅ เก็บ reactivity ไว้
import { toRefs } from 'vue';
const { count } = toRefs(state);
count.value++;
```

### 2.3 เลือกใช้อย่างไร

| สถานการณ์                         | แนะนำ                                        |
| --------------------------------- | -------------------------------------------- |
| ตัวเลข / string / boolean เดี่ยว  | `ref`                                        |
| Form object ที่ field เปลี่ยนบ่อย | `reactive` หรือ `ref({...})`                 |
| ต้อง reassign ทั้ง object         | `ref` (เพราะ `reactive` reassign เสีย proxy) |
| Return จาก composable             | มัก `ref` + `readonly` หรือ `toRefs`         |

**กฎทองในหลักสูตรนี้:** เริ่มด้วย `ref` เป็นค่าเริ่มต้น ใช้ `reactive` เมื่อต้องการ object ที่ field ร่วมกันชัดเจน

---

## 3. `computed` — Derived State ที่ Memoize

```js
import { ref, computed } from 'vue';

const items = ref([
  { name: 'A', price: 100 },
  { name: 'B', price: 50 },
]);

const total = computed(() => items.value.reduce((sum, i) => sum + i.price, 0));
```

พฤติกรรมสำคัญ:

1. **Lazy** — คำนวณเมื่อถูกอ่านครั้งแรก
2. **Cached** — ไม่คำนวณซ้ำถ้า dependency ไม่เปลี่ยน
3. **Read-only โดยค่าเริ่มต้น** — เขียนได้ถ้าสร้างด้วย `{ get, set }`

```js
const firstName = ref('Worapha');
const lastName = ref('Dev');

const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (v) => {
    const [f, ...rest] = v.split(' ');
    firstName.value = f;
    lastName.value = rest.join(' ');
  },
});
```

อย่าใส่ side effect ใน `computed` — ใช้ `watch` แทน

ดูตัวอย่าง: [`examples/02-computed-watch/`](./examples/02-computed-watch/)

---

## 4. `watch` / `watchEffect` — Side Effects

### 4.1 `watch` — ระบุ source ชัดเจน

```js
import { ref, watch } from 'vue';

const query = ref('');

watch(
  query,
  (next, prev) => {
    console.log(`search: ${prev} → ${next}`);
  },
  { immediate: false, flush: 'pre' },
);
```

ตัวเลือกที่ใช้บ่อย:

| Option            | ความหมาย                         |
| ----------------- | -------------------------------- |
| `immediate: true` | รันทันทีตอนสร้าง                 |
| `deep: true`      | ดู nested ของ object             |
| `flush: 'post'`   | รันหลัง DOM update               |
| `once: true`      | รันครั้งเดียวแล้วหยุด (Vue 3.4+) |

### 4.2 `watchEffect` — auto-track dependencies

```js
import { ref, watchEffect } from 'vue';

const id = ref(1);
const data = ref(null);

watchEffect(async (onCleanup) => {
  const ctrl = new AbortController();
  onCleanup(() => ctrl.abort());

  const res = await fetch(`/api/items/${id.value}`, { signal: ctrl.signal });
  data.value = await res.json();
});
```

| ใช้เมื่อ                           | API                     |
| ---------------------------------- | ----------------------- |
| รู้ source ชัด + ต้องการ old value | `watch`                 |
| effect อ่านหลายค่า / sync ง่าย     | `watchEffect`           |
| ต้อง cleanup fetch / timer         | ทั้งคู่ผ่าน `onCleanup` |

---

## 5. Component Architecture

### 5.1 Props (ลง) / Emit (ขึ้น)

```vue
<!-- Child.vue -->
<script setup>
const props = defineProps({
  modelValue: { type: String, required: true },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue', 'submit']);

function onInput(e) {
  emit('update:modelValue', e.target.value);
}
</script>
```

```vue
<!-- Parent -->
<Child v-model="name" @submit="save" />
```

### 5.2 Slots

```vue
<!-- Card.vue -->
<template>
  <article class="card">
    <header><slot name="header" /></header>
    <div><slot /></div>
    <footer><slot name="footer" :close="close" /></footer>
  </article>
</template>
```

Scoped slot ส่ง data จากลูก → พ่อใช้ใน markup

### 5.3 Provide / Inject

ใช้เมื่อส่ง props ลึกหลายชั้น (prop drilling):

```js
// Ancestor
import { provide, ref } from 'vue';
const theme = ref('dark');
provide('theme', theme);

// Deep child
import { inject } from 'vue';
const theme = inject('theme', ref('light')); // default
```

สำหรับ app-wide state ที่ซับซ้อน → ไป Pinia ในระดับ Intermediate

ดูตัวอย่าง: [`examples/03-component-architecture/`](./examples/03-component-architecture/)

---

## 6. Directives, Forms และ Lifecycle

### 6.1 Directives พื้นฐาน

| Directive                       | หน้าที่                                |
| ------------------------------- | -------------------------------------- |
| `v-if` / `v-else-if` / `v-else` | สร้าง/ทำลาย DOM ตามเงื่อนไข            |
| `v-show`                        | สลับ `display` — คง DOM ไว้            |
| `v-for`                         | วนรายการ — **ต้องมี `:key` ที่เสถียร** |
| `v-model`                       | two-way binding บน form / component    |
| `v-bind` (`:`)                  | bind attribute / prop                  |
| `v-on` (`@`)                    | listen event                           |

```vue
<li v-for="item in items" :key="item.id">{{ item.name }}</li>
<input v-model.trim="email" />
```

### 6.2 Lifecycle ใน Composition API

```
setup() / <script setup>
 │
 ├─ onBeforeMount
 ├─ onMounted  ← DOM พร้อม, เริ่มวัดขนาด / 3rd-party
 ├─ onBeforeUpdate
 ├─ onUpdated
 ├─ onBeforeUnmount
 └─ onUnmounted ← cleanup listeners / timers / observers
```

```js
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  window.addEventListener('resize', onResize);
});
onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});
```

ดูตัวอย่าง: [`examples/04-forms-directives-lifecycle/`](./examples/04-forms-directives-lifecycle/)

---

## 7. Best Practices สรุป

| หลักการ                 | ทำ                                                 |
| ----------------------- | -------------------------------------------------- |
| One-way data flow       | Props ลง / Events ขึ้น — ไม่ mutate props          |
| Derived → computed      | อย่า `watch` เพื่อคำนวณค่าแสดงผล                   |
| Cleanup always          | ทุก subscription มีคู่ `onUnmounted` / `onCleanup` |
| Stable keys             | `v-for` ใช้ `id` ไม่ใช้ index ถ้า reorder ได้      |
| Small components        | แยก UI ที่ reuse ได้ + logic เข้า composable       |
| Prefer `<script setup>` | น้อย boilerplate, auto-expose bindings             |

---

## Checklist ก่อนขึ้น Intermediate

- [ ] อธิบายได้ว่า `ref` กับ `reactive` ต่างกันอย่างไรบน Proxy
- [ ] เขียน `computed` ที่ cache และไม่มี side effect
- [ ] ใช้ `watch` + cleanup สำหรับ fetch
- [ ] ออกแบบ child ด้วย props + emit + slot
- [ ] รู้ว่า `onMounted` กับ `onUnmounted` ใช้ทำอะไร

**ต่อไป → [`../02-intermediate/README.md`](../02-intermediate/README.md)**
**หรือทำ Lab → [`LAB.md`](./LAB.md)**
