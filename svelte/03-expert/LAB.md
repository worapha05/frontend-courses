# Lab — Enterprise Ops Console (Expert)

สร้าง **SvelteKit Ops Console** ที่รวมแนวคิดระดับ Expert ทั้งสามข้อใน project เดียว

> ทำด้วยตัวเองก่อน แล้วค่อยเปิด [`lab/solution/`](./lab/solution/)

---

## เป้าหมาย

เมื่อทำครบ คุณจะมีแอปที่:

1. แสดง **ตารางออเดอร์แบบ virtualized** (windowing + Tailwind slate/teal)
2. ใช้ **`hooks.server.ts` + demo session + RBAC** — admin เห็นรายงาน, user ไม่เห็น
3. มีอย่างน้อยหนึ่ง route **prerender** (`/about`) และหนึ่ง route **`ssr = false`** (`/app/settings`)
4. มี **mock ORM** แบบ repository (`$lib/server/db.ts`) คล้าย Prisma
5. มี **server cache Map + TTL** สำหรับรายงานแพง
6. มี **คอมเมนต์อธิบาย hydration mismatch** (เช่น อย่าเรนเดอร์ `Date.now()` คนละแบบ SSR/CSR)

---

## สตาร์ทเตอร์

คัดลอก scaffolding จากตัวอย่าง Expert (package.json ตามที่กำหนดในโจทย์, Tailwind, adapter-auto) แล้วสร้างโครง:

```
lab/your-app/
 src/
 hooks.server.ts
 app.d.ts
 app.css
 lib/
 types.ts
 components/OrdersGrid.svelte
 server/
 auth.ts  # DEMO-ONLY
 db.ts  # mock Prisma-style
 cache.ts  # Map + TTL
 orders.ts # หรือรวมใน db
 routes/
 +layout.server.ts
 +layout.svelte
 +page.svelte
 about/+page.ts # prerender = true
 about/+page.svelte
 login/...
 logout/...
 orders/...  # grid
 admin/...  # report (admin only)
 app/settings/+page.ts # ssr = false
 app/settings/+page.svelte
 forbidden/+page.svelte
```

```bash
cd lab/solution # หรือ folder ของคุณ
npm install
npm run dev
```

---

## โจทย์ทีละขั้น

### ส่วน A — Mock ORM + Orders Grid

1. สร้าง `$lib/server/db.ts` ให้มี API แนว Prisma เช่น:

```ts
db.order.findMany({ where, skip, take });
db.order.count({ where });
db.report.salesSummary(); // ช้าจำลอง (เช่น delay 200–400ms)
```

2. Seed ออเดอร์ ~3,000–5,000 รายการ deterministic

3. หน้า `/orders`:

- `+page.server.ts` รับ `page`, `status`, `q`
- แสดง `OrdersGrid.svelte` แบบ windowing (scrollTop + rowHeight)
- ใช้ `$derived` สำหรับ filter ฝั่ง client ถ้ามี
- `onDestroy` / cleanup listener ใน `onMount` return

### ส่วน B — Auth / RBAC (Demo-only)

1. Seed users: `admin/admin123`, `editor/editor123`, `user/user123`
2. `hooks.server.ts` ใส่ `event.locals.user`
3. `/admin` ต้อง `role === 'admin'` ไม่งั้น redirect `/forbidden`
4. หน้า admin เรียก `db.report.salesSummary()` ผ่าน **cache TTL** (เช่น 15 วินาที)
5. ติดป้ายชัดว่า auth เป็น **educational / demo-only**

### ส่วน C — Rendering Strategies

1. `/about` → `export const prerender = true`
2. `/app/settings` → `export const ssr = false`
3. ใน settings: แสดงค่าที่เกิดหลัง `onMount` พร้อมคอมเมนต์เรื่อง hydration

### ส่วน D — Hydration note

ใน `+page.svelte` หลักหรือ settings ใส่คอมเมนต์ภาษาไทย/อังกฤษประมาณนี้:

> อย่าเรนเดอร์ `Date.now()` / `toLocaleString()` คนละผลลัพธ์ระหว่าง SSR กับ CSR
> ส่ง ISO จาก server หรือรอ `onMount` ก่อนแสดงค่าที่ขึ้นกับ browser

---

## เกณฑ์ตรวจ (rubric)

| เกณฑ์                          | ผ่านเมื่อ                                                          |
| ------------------------------ | ------------------------------------------------------------------ |
| Virtualized grid               | DOM แถวน้อยกว่าจำนวนข้อมูลที่โหลดมาชัดเจน                          |
| RBAC                           | user เข้า `/admin` ไม่ได้; admin เข้าได้                           |
| Cache                          | เรียก report ซ้ำใน TTL แล้วไม่รอ delay เต็มทุกครั้ง (ดู log ก็ได้) |
| Prerender + SPA route          | มี `/about` และ `/app/settings` ตามสเปก                            |
| Demo auth labeled              | มีข้อความเตือนใน UI หรือโค้ด                                       |
| ไม่พึ่ง npm install จากผู้ตรวจ | โค้ดครบ — ผู้เรียนรันเอง                                           |

---

## Hints

- อย่า import `$lib/server/*` ใน component ฝั่ง client — แยก type ไป `$lib/types.ts`
- Cookie: `httpOnly`, `sameSite: 'lax'` — ติดป้าย `secure: false` ว่า demo
- Cache key ควรรวมสิ่งที่กระทบผลลัพธ์ (เช่น `'sales-summary:v1'`) และอย่าแชร์ข้ามสิทธิ์
- สี: slate + teal/emerald — ห้าม purple theme

---

## เฉลย

ดูโครงสร้างและโค้ดเต็มที่ [`lab/solution/`](./lab/solution/)
