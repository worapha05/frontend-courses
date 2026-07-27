# Lab — Intermediate: Product Catalog + Blog (App Router)

## เป้าหมาย

สร้างมินิแอป **Catalog + Blog** ด้วย Next.js App Router
ฝึก RSC/RCC, Dynamic Routes, Route Handlers และเลือก SSR / SSG / ISR ให้ถูกที่

## โจทย์

| Route                    | Rendering                    | คำอธิบาย                      |
| ------------------------ | ---------------------------- | ----------------------------- |
| `/`                      | SSG                          | หน้าแรก marketing             |
| `/products`              | ISR (`revalidate: 30`)       | รายการสินค้าจาก Route Handler |
| `/products/[id]`         | SSR (`no-store`)             | รายละเอียดสินค้า (stock สด)   |
| `/blog/[slug]`           | SSG + `generateStaticParams` | บทความจาก data ท้องถิ่น       |
| `GET /api/products`      | —                            | คืนรายการสินค้า JSON          |
| `GET /api/products/[id]` | —                            | คืนสินค้าชิ้นเดียว หรือ 404   |

### ข้อกำหนดบังคับ

1. หน้า `/products` เป็น **Server Component** ดึงข้อมูลบน server
2. มี Client Component อย่างน้อย 1 ตัว (เช่น ปุ่ม “Add to wishlist” ที่เก็บใน `localStorage`)
3. `/products/[id]` เรียก `notFound()` เมื่อไม่มีสินค้า
4. Blog มีอย่างน้อย 3 slug ที่ generate ตอน build
5. Root layout มี navigation ร่วม
6. TypeScript strict — ห้าม `any`

### โครง Product

```ts
type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};
```

### โครง Post

```ts
type Post = {
  slug: string;
  title: string;
  body: string;
};
```

## เกณฑ์ผ่าน

- [ ] ทุก route ในตารางทำงาน
- [ ] แยก RSC / RCC ถูกต้อง (wishlist เป็น client)
- [ ] ISR / SSR / SSG ตั้งค่าตามตาราง
- [ ] API คืน status ที่เหมาะสม

## คำใบ้

- ใน dev mode พฤติกรรม cache อาจต่างจาก production — ทดสอบ `npm run build && npm start` ด้วย
- `params` ใน Next.js 15 เป็น `Promise` — ต้อง `await`
- วาง data blog ใน `data/posts.ts` แล้ว import จาก Server Component ได้เลย (ไม่ต้อง fetch)
- **อย่า** ให้หน้า RSC ไป `fetch` `/api` ของตัวเองตอน build — เรียก `data/` หรือ `lib/` โดยตรง แล้วให้ Route Handler ใช้ชั้นเดียวกัน

## เฉลย

ดูโค้ดเต็มที่ [`lab/solution/`](./lab/solution/)

```bash
cd lab/solution
npm install
npm run dev
```
