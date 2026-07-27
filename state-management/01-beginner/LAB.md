# Lab ระดับ Beginner — แผงควบคุมร้านค้า “ShopDesk”

## เป้าหมาย

ออกแบบระบบจัดการ state สำหรับแอดมินร้านค้าจำลอง **ShopDesk**:

- แยก **Client State** (UI filters / selection) ออกจาก **Server State** (รายการออเดอร์)
- ใช้ **Redux Toolkit** สำหรับ UI client state
- ใช้ **TanStack Query** โหลดออเดอร์จาก REST (mock ได้)
- ใช้ **Apollo Client** โหลดข้อมูล catalog จาก GraphQL (mock operation ได้)

ทำด้วยตัวเองก่อน แล้วค่อยเทียบกับ [`lab/solution/`](./lab/solution/)

---

## กรณีศึกษา

ทีม ShopDesk เคยยัดทุกอย่างลง Redux รวมถึง `orders[]` จาก API
ผลคือ:

- ต้องเขียน loading/error flags เองทุกครั้ง
- สองหน้าเปิดพร้อมกันแล้ว cache ไม่แชร์
- filter เปลี่ยนทีต้องเคลียร์ state เองแบบพลาดบ่อย

คุณถูกมอบหมายให้ redesign data flow ระดับ foundation

---

## โจทย์

### ส่วนที่ 1 — ออกแบบ Ownership

สร้างไฟล์ `NOTES.md` อธิบายตาราง:

| ข้อมูล                                      | Client / Server | Local / Global / Cache | เหตุผลสั้น ๆ |
| ------------------------------------------- | --------------- | ---------------------- | ------------ |
| `sidebarOpen`                               | ?               | ?                      |              |
| `statusFilter` (`all` / `paid` / `pending`) | ?               | ?                      |              |
| `selectedOrderId`                           | ?               | ?                      |              |
| `orders` จาก API                            | ?               | ?                      |              |
| `catalog categories` จาก GraphQL            | ?               | ?                      |              |

### ส่วนที่ 2 — RTK UI Store

สร้าง:

1. `uiSlice` มีอย่างน้อย:

- `sidebarOpen: boolean`
- `statusFilter: 'all' | 'paid' | 'pending'`
- `selectedOrderId: string | null`

2. actions: `toggleSidebar`, `setStatusFilter`, `selectOrder`, `clearSelection`
3. `configureStore` + typed hooks
4. selectors: `selectStatusFilter`, `selectSelectedOrderId`

### ส่วนที่ 3 — React Query Orders

1. กำหนด `orderKeys` เช่น `['orders', { status }]`
2. เขียน `fetchOrders(status)` (เรียก mock API หรือ function จำลองที่ filter ตาม status ได้)
3. component `OrderBoard` ใช้:

- `useAppSelector(selectStatusFilter)` เป็นส่วนหนึ่งของ queryKey
- `useQuery` โหลดออเดอร์

4. เมื่อคลิกแถว → `dispatch(selectOrder(id))` (**อย่า** เก็บ order object ทั้งก้อนใน Redux)

### ส่วนที่ 4 — Apollo Catalog

1. ตั้ง `ApolloClient` + `InMemoryCache`
2. เขียน query `GetCategories` (จะ mock ด้วย local schema หรือใช้ query จริงก็ได้)
3. component `CategoryRail` แสดงรายการหมวดด้วย `useQuery`

### ส่วนที่ 5 — คำถามคิด (ตอบใน `NOTES.md`)

1. ทำไม `statusFilter` ถึงอยู่ RTK แต่ `orders` อยู่ React Query?
2. ถ้า copy `orders` เข้า Redux หลัง `useQuery` สำเร็จ จะเกิดปัญหาอะไรเมื่อ invalidate?
3. `selectedOrderId` ควรเป็น local state ของตารางได้หรือไม่? ข้อดี/ข้อเสีย vs global?

---

## เกณฑ์ผ่าน

- [ ] ตาราง ownership ใน `NOTES.md` สมเหตุสมผล
- [ ] RTK store ครบ actions/selectors ตามสเปก
- [ ] `OrderBoard` derive queryKey จาก filter ใน store
- [ ] ไม่เก็บ `orders[]` เป็น source of truth ใน Redux
- [ ] Apollo provider + categories query ใช้งานได้ในโครงสร้างโค้ด
- [ ] ตอบคำถามคิดครบ

---

## เฉลย

ดูโค้ดเต็มที่ [`lab/solution/`](./lab/solution/)

อยากเห็น version ที่รันใน browser ได้ทันที: [`examples/05-vite-shopdesk/`](./examples/05-vite-shopdesk/)

```bash
npm run install:beginner
npm run dev:beginner
```
