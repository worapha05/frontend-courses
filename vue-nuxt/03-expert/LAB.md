# Lab — Expert: Enterprise Ops Dashboard

## เป้าหมาย

สร้าง **Ops Dashboard** ระดับ enterprise ที่รวม:

1. High-performance data grid (filter / multi-sort / CSV export)
2. RBAC middleware (admin vs viewer)
3. Nitro APIs พร้อม cache, proxy-style error handling และ server-side role check

## โจทย์

สร้าง project ใน `lab/solution/`:

```
lab/solution/
 nuxt.config.ts
 app.vue
 pages/
 index.vue  # landing
 login.vue
 forbidden.vue
 dashboard/index.vue # grid (auth required)
 dashboard/admin.vue # admin-only cached report
 middleware/
 auth.ts
 rbac.ts
 stores/
 auth.ts
 composables/
 useDataGrid.ts
 components/
 OrdersGrid.vue
 server/
 api/
 orders/index.get.ts
 admin/report.get.ts
 utils/
 orders.ts
 auth.ts
 http.ts
```

### ข้อกำหนดบังคับ

#### A) Auth & RBAC

- Login จำลองเลือก role: `admin` | `viewer`
- `/dashboard` → middleware `auth`
- `/dashboard/admin` → `auth` + `rbac` meta `roles: ['admin']`
- API `/api/admin/report` ต้องเช็ก role ฝั่ง server (header `x-demo-role` ก็ได้สำหรับ lab)

#### B) Data Grid

- โหลด orders ≥ 2,000 แถวจาก `/api/orders`
- Filter: text search + status + region + amount range
- Multi-column sort (Shift+click)
- Pagination
- Export CSV จาก **filtered+sorted** dataset
- UI ใช้ Tailwind (headless table — ไม่ต้องใช้ AG Grid)

#### C) Nitro

- `/api/admin/report` ใช้ `cachedEventHandler` (maxAge ≥ 10)
- Invalid query → `400` ด้วย helper
- Upstream/internal failure จำลอง → map เป็น `createError` ที่อ่านรู้เรื่อง

### `routeRules` แนะนำ

```ts
routeRules: {
 '/dashboard/**': { ssr: false },
}
```

## เกณฑ์ผ่าน

- [ ] viewer เข้า `/dashboard` ได้ แต่เข้า `/dashboard/admin` ไม่ได้
- [ ] admin เห็น cached report และ API ปฏิเสธ viewer
- [ ] grid filter/sort/export ทำงานบนชุดข้อมูลใหญ่
- [ ] ไม่มี secret ใน client (token ถ้ามี ต้องอยู่ใน runtimeConfig server)

## คำใบ้

- แยก `useDataGrid` ให้ pure ที่สุด — รับ `Ref<rows>`
- Server auth helper: `requireRole(event, ['admin'])`
- Export ใช้ `Blob` + object URL ฝั่ง client

## เฉลย

ดูโค้ดเต็มที่ [`lab/solution/`](./lab/solution/)

```bash
cd lab/solution
npm install
npm run dev
```
