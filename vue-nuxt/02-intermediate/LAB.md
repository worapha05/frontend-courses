# Lab — Intermediate: Nuxt Mini Shop

## เป้าหมาย

สร้างแอป **Nuxt 3 Mini Shop** ที่รวม architecture, hybrid rendering, Pinia และ data fetching

## โจทย์

สร้าง project ใน `lab/solution/` ตามโครงนี้:

```
lab/solution/
 app.vue
 nuxt.config.ts
 pages/
 index.vue  # catalog (SSR)
 products/[id].vue # detail (SSR)
 cart.vue  # cart (CSR via routeRules)
 about.vue  # prerender
 components/
 ProductCard.vue
 CartBadge.vue
 stores/
 cart.ts
 server/api/
 products/index.ts
 products/[id].ts
 composables/
 useProductFilters.ts
```

### ข้อกำหนดบังคับ

1. **`routeRules`**

- `/about` → `prerender: true`
- `/cart` → `ssr: false`
- อื่น ๆ ใช้ SSR ปกติ

2. **Pinia cart store** (setup store)

- `add`, `remove`, `clear`, `count`, `total`
- แสดง `CartBadge` ใน `app.vue`

3. **Catalog**

- `useFetch('/api/products')` พร้อม `key: 'catalog'`
- filter ด้วย query `q` + `category` (ผ่าน composable)
- คลิกไป `/products/:id`

4. **Detail**

- `useAsyncData` keyed ด้วย id
- รองรับ 404 จาก API

5. **API**

- มีสินค้าอย่างน้อย 6 รายการ ใน 2+ categories
- detail คืน description + stock

## เกณฑ์ผ่าน

- [ ] hybrid `routeRules` ครบ
- [ ] cart ทำงานข้ามหน้า
- [ ] filter/search ไม่ทำลาย hydration (ใช้ key + watch ถูกต้อง)
- [ ] 404 detail แสดง error state

## คำใบ้

- `@pinia/nuxt` ใน `modules`
- `query: { q, category }` ใน `useFetch`
- `createError({ statusCode: 404 })` ใน Nitro handler

## เฉลย

ดูโค้ดเต็มที่ [`lab/solution/`](./lab/solution/)

```bash
cd lab/solution
npm install
npm run dev
```
