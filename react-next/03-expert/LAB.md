# Lab — Expert: Commerce Ops Dashboard

## เป้าหมาย

สร้าง **Commerce Ops Dashboard** ด้วย Next.js ที่รวม:

- Middleware auth (cookie session)
- Server Actions + Route Handlers (pattern คล้าย ORM repository)
- Zustand สำหรับ UI preferences ฝั่ง client
- Responsive dashboard grid ด้วย Tailwind CSS

## โจทย์

### Routes

| Path                     | คำอธิบาย                                            |
| ------------------------ | --------------------------------------------------- |
| `/login`                 | ตั้ง cookie `session` แล้ว redirect ไป `/dashboard` |
| `/dashboard`             | ต้อง login — แสดง KPI + ตารางออเดอร์                |
| `GET/POST /api/orders`   | รายการ / สร้างออเดอร์ (validate ด้วย Zod)           |
| `PATCH /api/orders/[id]` | update สถานะออเดอร์                                 |

### feature บังคับ

1. **Middleware** กัน `/dashboard/*` ถ้าไม่มี `session`
2. **Server Action** `createOrderAction` สร้างออเดอร์แล้ว `revalidatePath("/dashboard")`
3. **Repository layer** (`lib/orderRepo.ts`) แยกจาก UI — จำลอง ORM
4. **Zustand store** เก็บ `denseMode` และ `sidebarCollapsed` (persist)
5. **Dashboard grid** responsive:

- KPI 4 ใบ: `grid-cols-1 sm:grid-cols-2 xl:grid-cols-4`
- ตารางออเดอร์เต็มความกว้างบนมือถือ (scroll-x ได้)

6. สถานะออเดอร์: `pending` | `paid` | `shipped` | `cancelled`

### โครง Order

```ts
type OrderStatus = 'pending' | 'paid' | 'shipped' | 'cancelled';

type Order = {
  id: string;
  customer: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
};
```

### ข้อกำหนด Validation

- `customer`: trim ยาว 2–60
- `total`: number > 0 และ ≤ 1_000_000

## เกณฑ์ผ่าน

- [ ] เข้า `/dashboard` โดยไม่ login แล้วถูกเด้งไป `/login`
- [ ] สร้างออเดอร์ผ่าน Server Action ได้
- [ ] `GET /api/orders` คืน JSON
- [ ] เปลี่ยนสถานะผ่าน action หรือ API ได้
- [ ] Dense mode จาก Zustand มีผลกับ padding ของตาราง
- [ ] เลย์เอาต์ใช้ได้ทั้งมือถือและเดสก์ท็อป

## คำใบ้

- Cookie ตั้งด้วย `cookies()` จาก `next/headers` ใน Server Action
- แยก Client Component สำหรับปุ่ม dense/sidebar ที่อ่าน Zustand
- Repository เก็บใน module scope ได้สำหรับ lab (process memory)

## เฉลย

ดูโค้ดเต็มที่ [`lab/solution/`](./lab/solution/)

```bash
cd lab/solution
npm install
npm run dev
```
