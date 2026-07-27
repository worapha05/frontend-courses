# Level 3 — Expert: Enterprise Dashboards & Performance

เป้าหมายระดับนี้: สร้างระบบระดับ production — **Data Grid ประสิทธิภาพสูง**,
**RBAC middleware**, และ **Nitro server engine** พร้อม caching / proxy / error boundaries

---

## สารบัญ

1. [High-Performance Data Grids](#1-high-performance-data-grids)
2. [Route Guards & RBAC Middleware](#2-route-guards--rbac-middleware)
3. [Nitro Server Engine](#3-nitro-server-engine)
4. [Caching, Proxy และ Error Boundaries](#4-caching-proxy-และ-error-boundaries)
5. [Best Practices สรุป](#5-best-practices-สรุป)

---

## 1. High-Performance Data Grids

เมื่อตารางมีหลักพัน–หมื่นแถว UI จะช้าถ้า:

- filter/sort ใน template โดยตรงทุกครั้งที่ render
- re-render ทั้งหน้าเมื่อพิมพ์ 1 ตัวอักษร
- ไม่มี virtualization / pagination

แนวทางในหลักสูตรนี้ (headless + Tailwind):

```
┌──────────────┐ ┌─────────────────┐ ┌──────────────┐
│ Filter UI │────►│ useDataGrid() │────►│ Table View │
│ Sort headers │ │ (pure compute) │ │ (presentational)
│ Export btn │ └─────────────────┘ └──────────────┘
```

หลักการ:

| เทคนิค                       | ทำไม                                  |
| ---------------------------- | ------------------------------------- |
| Derived `computed` pipeline  | filter → sort → page แยกชั้น ชัดเจน   |
| Debounce search input        | ลดงานตอนพิมพ์เร็ว                     |
| Stable column defs           | ไม่สร้าง config object ใหม่ทุก render |
| Export จาก **filtered view** | ผู้ใช้ได้ไฟล์ตามที่เห็นบนจอ           |
| Headless UI                  | logic แยกจาก styling — ทดสอบง่าย      |

ดูตัวอย่าง: [`examples/01-data-grid/`](./examples/01-data-grid/)

---

## 2. Route Guards & RBAC Middleware

Nuxt middleware รันก่อนเข้าหน้า:

```
navigateTo('/admin')
 │
 ▼
┌───────────────────┐
──► auth.ts  │ มี session?
 │  │
 ▼  │
──► rbac.ts  │ role ∈ allowed?
 │  │
 ▼  │
 render page │
```

```ts
// middleware/rbac.ts
export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();
  const roles = to.meta.roles as string[] | undefined;
  if (!roles) return;
  if (!auth.user) return navigateTo('/login');
  if (!roles.includes(auth.user.role)) {
    return navigateTo('/forbidden');
  }
});
```

```vue
<script setup>
definePageMeta({
  middleware: ['auth', 'rbac'],
  roles: ['admin', 'editor'],
});
</script>
```

กฎทอง:

1. **อย่า trust client อย่างเดียว** — API ฝั่ง Nitro ต้องเช็ก role อีกครั้ง
2. เก็บ session token ใน httpOnly cookie เมื่อเป็น production จริง
3. แยก middleware `auth` (ต้อง login) กับ `rbac` (ต้องมี role)

ดูตัวอย่าง: [`examples/02-rbac-middleware/`](./examples/02-rbac-middleware/)

---

## 3. Nitro Server Engine

Nitro คือ server ที่ Nuxt ใช้ — deploy ได้หลายเป้าหมาย (Node, serverless, workers)

```
server/
 api/  → /api/*
 routes/ → custom paths
 middleware/ → ทุก request
 utils/  → helpers (server-only)
 plugins/ → nitro plugins
```

```ts
// server/api/orders/index.get.ts
export default defineEventHandler(async (event) => {
  const user = await requireUser(event); // throw 401 ถ้าไม่มี
  return listOrdersFor(user.id);
});
```

HTTP method แยกด้วยชื่อไฟล์: `index.get.ts`, `index.post.ts`, `[id].patch.ts`

ดูตัวอย่าง: [`examples/03-nitro-server/`](./examples/03-nitro-server/)

---

## 4. Caching, Proxy และ Error Boundaries

### 4.1 Cached handlers

```ts
import { cachedEventHandler } from 'nitropack/runtime';

export default cachedEventHandler(
  async () => {
    return await expensiveReport();
  },
  {
    maxAge: 60,
    name: 'orders-report',
    getKey: (event) => getQuery(event).range?.toString() ?? '7d',
  },
);
```

### 4.2 API Proxy

```ts
// server/api/proxy/github.get.ts
export default defineEventHandler(async (event) => {
  const q = getQuery(event).q;
  // secret อยู่ฝั่ง server เท่านั้น
  return await $fetch('https://api.github.com/search/repositories', {
    query: { q },
    headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
  });
});
```

### 4.3 Error boundaries

```ts
// server/utils/errors.ts
export function assertFound<T>(value: T | undefined, message: string): T {
  if (!value) {
    throw createError({ statusCode: 404, statusMessage: message });
  }
  return value;
}
```

ฝั่ง UI ใช้ `<NuxtErrorBoundary>` หรือจัดการ `error` จาก `useFetch`

```
Client  Nitro
 │   │
 │ GET /api/report │
 │────────────────────►│
 │   ├─ cache hit? return
 │   ├─ proxy upstream
 │   ├─ map error → createError
 │◄────────────────────│
 │ show error state │
```

---

## 5. Best Practices สรุป

| หลักการ                     | ทำ                                         |
| --------------------------- | ------------------------------------------ |
| Compute once, render dumb   | Grid logic ใน composable                   |
| Defense in depth            | Middleware + server auth ทั้งคู่           |
| Cache with a key strategy   | TTL + getKey ที่คิดมาแล้ว                  |
| Proxy secrets               | ไม่มี token ใน client bundle               |
| Typed errors                | `createError` + statusCode ที่สื่อความหมาย |
| Measure before virtualizing | pagination ก่อน แล้วค่อย virtual scroll    |

---

## Checklist จบหลักสูตร

- [ ] Data grid รองรับ filter หลาย column + multi-sort + export
- [ ] RBAC middleware กันหน้า และ API กันซ้ำ
- [ ] Nitro route มี cache / proxy / error handling
- [ ] อธิบาย trade-off ของ SWR vs maxAge cache ได้

**ทำ Lab สุดท้าย → [`LAB.md`](./LAB.md)**
