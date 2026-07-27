# Level 2 — Intermediate: Nuxt 3 Powerhouse

เป้าหมายระดับนี้: ให้คุณเข้าใจ **Nuxt 3 เป็น meta-framework**
ไม่ใช่แค่ Vue + router — แต่เป็นระบบ Universal Rendering, auto-imports และ server engine (Nitro)

---

## สารบัญ

1. [Nuxt 3 Architecture](#1-nuxt-3-architecture)
2. [Directory Structure ที่สำคัญ](#2-directory-structure-ที่สำคัญ)
3. [Universal Rendering: SSR / SSG / Hybrid](#3-universal-rendering-ssr--ssg--hybrid)
4. [State Management ด้วย Pinia](#4-state-management-ด้วย-pinia)
5. [Data Fetching: `useFetch` / `useAsyncData`](#5-data-fetching-usefetch--useasyncdata)
6. [Best Practices สรุป](#6-best-practices-สรุป)

---

## 1. Nuxt 3 Architecture

```
┌─────────────────────────────────────────────────────┐
│   Browser (Client)   │
│ Vue app · Pinia · hydrated payload · navigation │
└──────────────────────────▲──────────────────────────┘
    │ HTML + __NUXT__ payload
┌──────────────────────────┴──────────────────────────┐
│   Nuxt App (Universal)  │
│ pages/ · components/ · composables/ · middleware/ │
└──────────────────────────▲──────────────────────────┘
    │
┌──────────────────────────┴──────────────────────────┐
│  Nitro Server Engine   │
│ server/api · server/routes · cached handlers │
└─────────────────────────────────────────────────────┘
```

จุดเด่นที่ต้องรู้:

| แนวคิด              | ความหมาย                                                               |
| ------------------- | ---------------------------------------------------------------------- |
| Auto-imports        | `ref`, `useFetch`, components ใน `components/` ถูก import ให้อัตโนมัติ |
| File-based routing  | ไฟล์ใน `pages/` = route                                                |
| Payload hydration   | ข้อมูลจาก SSR ส่งไป client โดยไม่ fetch ซ้ำ                            |
| Server/Client split | โค้ดบางส่วนรันได้เฉพาะฝั่ง (`.server.ts` / `.client.ts`)               |

ดูตัวอย่าง: [`examples/01-nuxt-architecture/`](./examples/01-nuxt-architecture/)

---

## 2. Directory Structure ที่สำคัญ

```
app/
├── pages/  # routes
├── components/ # auto-imported UI
├── composables/ # useXxx() auto-imported
├── layouts/  # default / custom layouts
├── middleware/ # route guards
├── plugins/  # app plugins
├── stores/  # Pinia (หรือใช้ composables)
├── server/
│ ├── api/  # /api/* handlers
│ ├── routes/ # custom routes
│ ├── middleware/ # server middleware
│ └── utils/ # server-only helpers
├── public/  # static assets
├── app.vue
├── nuxt.config.ts
└── package.json
```

### Auto-imports ที่ใช้บ่อย

```vue
<script setup>
// ไม่ต้อง import จาก 'vue' หรือ '#app'
const count = ref(0);
const route = useRoute();
const { data } = await useFetch('/api/hello');
</script>
```

กฎ: ตั้งชื่อ composable เป็น `useSomething` แล้ววางใน `composables/`

---

## 3. Universal Rendering: SSR / SSG / Hybrid

### 3.1 โหมดหลัก

| โหมด       | เมื่อไหร่                                 | พฤติกรรม              |
| ---------- | ----------------------------------------- | --------------------- |
| **SSR**    | ข้อมูลเปลี่ยนบ่อย / SEO / personalization | render ตอน request    |
| **SSG**    | เนื้อหาค่อนข้างนิ่ง                       | pre-render ตอน build  |
| **CSR**    | dashboard หลัง login ที่ SEO ไม่สำคัญ     | render ฝั่ง client    |
| **Hybrid** | ผสมต่อ route ด้วย `routeRules`            | ดีที่สุดสำหรับแอปจริง |

### 3.2 `routeRules` (Hybrid)

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true }, // SSG
    '/blog/**': { swr: 60 }, // stale-while-revalidate 60s
    '/dashboard/**': { ssr: false }, // CSR
    '/api/**': { cors: true },
  },
});
```

```
Request ──► Nitro
  │
  ├─ prerender hit? → static HTML
  ├─ SWR cache fresh? → cached response
  ├─ ssr:false? → SPA shell
  └─ default SSR → render Vue on server
```

ดูตัวอย่าง: [`examples/02-universal-rendering/`](./examples/02-universal-rendering/)

---

## 4. State Management ด้วย Pinia

Pinia เป็น official store ของ Vue/Nuxt:

```ts
// stores/cart.ts
export const useCartStore = defineStore('cart', () => {
  const items = ref([]);
  const total = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0));

  function add(item) {
    items.value.push(item);
  }

  return { items, total, add };
});
```

ข้อดีของ Setup Store (Composition style):

- ใช้ `ref` / `computed` แบบเดียวกับ component
- Type inference ดี
- SSR-friendly เมื่อใช้กับ `@pinia/nuxt`

```vue
<script setup>
const cart = useCartStore();
</script>
```

ดูตัวอย่าง: [`examples/03-pinia-state/`](./examples/03-pinia-state/)

---

## 5. Data Fetching: `useFetch` / `useAsyncData`

### 5.1 ความต่าง

| API                          | ใช้เมื่อ                                   |
| ---------------------------- | ------------------------------------------ |
| `useFetch(url)`              | wrapper สะดวกของ `$fetch` + `useAsyncData` |
| `useAsyncData(key, handler)` | logic ซับซ้อน / รวมหลายแหล่ง / transform   |

```ts
// ใช้ key ที่เสถียร — สำคัญมากสำหรับ dedupe + hydration
const { data, pending, error, refresh } = await useFetch('/api/products', {
  key: 'products-list',
  query: { q: search },
  watch: [search],
  server: true,
  lazy: false,
});
```

### 5.2 กฎ hydration ที่ห้ามละเมิด

1. **Key ต้อง unique** ต่อข้อมูลชุดนั้น
2. Handler ต้อง **deterministic** ระหว่าง server/client (ระวัง `Date.now()` / `Math.random()` ใน render path)
3. อย่าเรียก `useFetch` ในเงื่อนไข `if` แบบไม่คงที่ — ผิดกฎ composable
4. Client-only data → `server: false` หรือ `lazy: true`

```ts
const id = computed(() => route.params.id);
const { data: product } = await useAsyncData(
  () => `product-${id.value}`,
  () => $fetch(`/api/products/${id.value}`),
  { watch: [id] },
);
```

ดูตัวอย่าง: [`examples/04-usefetch-asyncdata/`](./examples/04-usefetch-asyncdata/)

---

## 6. Best Practices สรุป

| หลักการ                          | ทำ                                              |
| -------------------------------- | ----------------------------------------------- |
| Prefer `routeRules`              | Hybrid > โหมดเดียวทั้งแอป                       |
| Pinia สำหรับ shared client state | URL/query สำหรับ shareable filters              |
| `useAsyncData` มี key เสมอ       | กัน fetch ซ้ำตอน navigate                       |
| Server secrets ใน `server/`      | อย่าใส่ API key ใน composable ที่รันฝั่ง client |
| Composables = reuse logic        | Components = reuse UI                           |

---

## Checklist ก่อนขึ้น Expert

- [ ] อธิบาย SSR vs SSG vs Hybrid ได้
- [ ] ตั้ง `routeRules` ต่อประเภทหน้าได้
- [ ] เขียน Pinia setup store
- [ ] ใช้ `useFetch`/`useAsyncData` พร้อม key และ refresh
- [ ] แยก `server/api` จาก UI อย่างชัดเจน

**ต่อไป → [`../03-expert/README.md`](../03-expert/README.md)**
**หรือทำ Lab → [`LAB.md`](./LAB.md)**
