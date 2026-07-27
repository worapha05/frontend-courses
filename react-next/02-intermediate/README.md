# Level 2 — Intermediate: Next.js Framework Mastery

เป้าหมายระดับนี้: ให้คุณใช้ **Next.js App Router** ได้อย่างมั่นใจ
โดยเข้าใจขอบเขตของ **Server Components (RSC)** กับ **Client Components (RCC)**
และเลือก **SSR / SSG / ISR** ให้ตรงกับข้อมูลจริง

---

## สารบัญ

1. [ทำไมต้อง Next.js สำหรับ Full-stack](#1-ทำไมต้อง-nextjs-สำหรับ-full-stack)
2. [App Router Mental Model](#2-app-router-mental-model)
3. [RSC vs RCC](#3-rsc-vs-rcc)
4. [File-based Routing](#4-file-based-routing)
5. [Layouts, Templates, Loading, Error](#5-layouts-templates-loading-error)
6. [Route Handlers (API Routes)](#6-route-handlers-api-routes)
7. [Data Fetching: SSR / SSG / ISR](#7-data-fetching-ssr--ssg--isr)
8. [Best Practices สรุป](#8-best-practices-สรุป)

---

## 1. ทำไมต้อง Next.js สำหรับ Full-stack

React อย่างเดียว = UI library บน client
Next.js = **framework** ที่รวม routing, rendering, data fetching และ server runtime

| ความต้องการ            | Vite SPA     | Next.js App Router              |
| ---------------------- | ------------ | ------------------------------- |
| SEO / first paint      | ต้อง SSR เอง | built-in                        |
| API + UI ใน repo เดียว | แยก server   | Route Handlers / Server Actions |
| แชร์โค้ด server/client | ยาก          | conventions + `"use client"`    |
| Cache / revalidate     | ทำเอง        | `fetch` cache + ISR             |

สำหรับ Full-stack ที่เคยเขียน Express + React แยกกัน — Next.js รวมขอบเขตให้เหลือ **หนึ่ง mental model ของ request**

---

## 2. App Router Mental Model

folder `app/` คือ routing tree:

```
app/
 layout.tsx  → Root layout (บังคับ)
 page.tsx  → /
 products/
 page.tsx  → /products
 [id]/
 page.tsx → /products/:id
 api/
 hello/
 route.ts → /api/hello
```

**กฎสำคัญ**

- มี `page.tsx` ถึงจะเป็น public route
- `layout.tsx` ครอบ children และ **ไม่ remount** เมื่อ navigate ใน segment เดียวกัน
- Special files: `loading.tsx`, `error.tsx`, `not-found.tsx`, `template.tsx`, `route.ts`

```
Request
 → match segments
 → run Server Components (fetch บน server ได้)
 → stream HTML / RSC payload
 → hydrate Client Components บน browser
```

---

## 3. RSC vs RCC

### ค่าเริ่มต้น = Server Component

ไฟล์ใน `app/` ที่ไม่มี `"use client"` คือ **RSC**:

- รันบน server เท่านั้น
- เข้าถึง DB, secrets, `fs` ได้ (ระวังอย่า leak)
- **ใช้ Hooks ของ browser ไม่ได้** (`useState`, `useEffect`, …)
- ส่ง props ไปยัง Client Component ได้เฉพาะค่าที่ serialize ได้

### เมื่อไหร่ต้อง `"use client"`

ใส่ที่ **ขอบเขตที่ต้องการ interactivity** — ไม่ใช่ทุกไฟล์

```tsx
'use client';

import { useState } from 'react';

export function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes((n) => n + 1)}>❤️ {likes}</button>;
}
```

| ต้องการ                               | เลือก                  |
| ------------------------------------- | ---------------------- |
| ดึงข้อมูลจาก DB / secret              | RSC หรือ Route Handler |
| onClick, form controlled, browser API | RCC                    |
| Context Provider ที่ใช้ hooks         | RCC (วางไว้ใกล้ใบ)     |
| SEO content หนัก                      | RSC                    |

**Composition ที่ดี:** Server Component ดึงข้อมูล → ส่งเป็น props → Client Component จัดการ interaction

```tsx
// app/products/page.tsx (RSC)
import { ProductFilters } from '@/components/ProductFilters'; // client
import { getProducts } from '@/lib/products';

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <main>
      <h1>สินค้า</h1>
      <ProductFilters initialProducts={products} />
    </main>
  );
}
```

---

## 4. File-based Routing

### Dynamic Routes

```
app/products/[id]/page.tsx
app/shop/[...slug]/page.tsx → catch-all
app/docs/[[...slug]]/page.tsx → optional catch-all
```

```tsx
type Props = { params: Promise<{ id: string }> };

export default async function ProductPage({ params }: Props) {
  const { id } = await params; // Next.js 15+: params เป็น Promise
  return <h1>Product {id}</h1>;
}
```

### Route Groups

folder `(marketing)` ไม่ปรากฏใน URL — ใช้แยก layout:

```
app/(marketing)/page.tsx → /
app/(marketing)/about/page.tsx → /about
app/dashboard/page.tsx  → /dashboard (layout คนละชุด)
```

### Parallel & Intercepting Routes (รู้ไว้)

ใช้สำหรับ modal จาก URL (`@modal`, `(.)photo`) — ระดับ Intermediate รู้แนวคิดพอ ลงมือใน Expert เมื่อจำเป็น

---

## 5. Layouts, Templates, Loading, Error

| ไฟล์            | พฤติกรรม                                                |
| --------------- | ------------------------------------------------------- |
| `layout.tsx`    | คง state / ไม่ remount เมื่อเปลี่ยนหน้าใน subtree       |
| `template.tsx`  | remount ทุกครั้งที่ navigate — เหมาะกับ enter animation |
| `loading.tsx`   | หุ้มด้วย Suspense อัตโนมัติ                             |
| `error.tsx`     | Client Component รับ error boundary                     |
| `not-found.tsx` | เรียกผ่าน `notFound()`                                  |

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard">
      <aside>Sidebar</aside>
      <section>{children}</section>
    </div>
  );
}
```

---

## 6. Route Handlers (API Routes)

ไฟล์ `app/api/.../route.ts` export function ตาม HTTP method:

```tsx
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ok: true, at: new Date().toISOString() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { title?: string };
  if (!body.title?.trim()) {
    return NextResponse.json({ error: 'title required' }, { status: 400 });
  }
  return NextResponse.json({ id: 'p-1', title: body.title }, { status: 201 });
}
```

ใช้เมื่อต้องการ HTTP endpoint จริง (webhook, public API, mobile client)
สำหรับ form จาก UI ในแอปเดียวกัน — พิจารณ **Server Actions** (ระดับ Expert)

---

## 7. Data Fetching: SSR / SSG / ISR

ใน App Router การควบคุม cache อยู่ที่ **`fetch` options** และ segment config

### SSR — ข้อมูลต้องสดทุก request

```tsx
export const dynamic = 'force-dynamic';

async function getCart() {
  const res = await fetch('https://api.example.com/cart', { cache: 'no-store' });
  return res.json();
}
```

เหมาะกับ: dashboard ส่วนตัว, ราคาหุ้น, ข้อมูลตาม session

### SSG — สร้างตอน build แล้วเสิร์ฟ static

```tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache', // default
  });
  return res.json();
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p: { slug: string }) => ({ slug: p.slug }));
}
```

เหมาะกับ: marketing pages, docs ที่เปลี่ยนน้อย

### ISR — static + refresh เป็นระยะ

```tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 }, // วินาที
  });
  return res.json();
}
```

หรือระดับ segment:

```tsx
export const revalidate = 60;
```

เหมาะกับ: หน้ารายการสินค้า, blog ที่ update เป็นพัก ๆ

### ตารางตัดสินใจเร็ว

| คำถาม                                 | ถ้าใช่ →                           |
| ------------------------------------- | ---------------------------------- |
| ขึ้นกับ cookie/session ของผู้ใช้?     | SSR (`no-store`)                   |
| เปลี่ยนน้อยมาก และรู้ path ตอน build? | SSG                                |
| เปลี่ยนเป็นพัก ๆ แชร์ได้ทุกคน?        | ISR                                |
| ต้อง invalidate ทันทีหลัง mutation?   | `revalidateTag` / `revalidatePath` |

---

## 8. Best Practices สรุป

| หลักการ      | ทำ                             | อย่าทำ                                                 |
| ------------ | ------------------------------ | ------------------------------------------------------ |
| Server-first | เริ่ม RSC แล้วค่อยเพิ่ม client | `"use client"` ทั้งหน้า                                |
| Fetch        | ดึงบน server ใกล้ข้อมูล        | waterfall จาก `useEffect`                              |
| Secrets      | เก็บใน server only             | `NEXT_PUBLIC_` สำหรับ secret                           |
| Layout       | ใส่ shell ที่ใช้ซ้ำ            | ใส่ page-specific data ใน root layout โดยไม่จำเป็น     |
| Cache        | ตั้งใจเลือก                    | เดาแล้วหวังว่า default ถูก                             |
| Data access  | เรียก DB/repo จาก RSC โดยตรง   | `fetch("http://localhost:3000/api/...")` ตอน prerender |

---

## ไฟล์ในระดับนี้

| folder                                                          | เนื้อหา                                 |
| --------------------------------------------------------------- | --------------------------------------- |
| [`examples/01-rsc-vs-rcc`](./examples/01-rsc-vs-rcc/)           | ผสม Server + Client Components          |
| [`examples/02-routing-layouts`](./examples/02-routing-layouts/) | Dynamic routes, layouts, route handlers |
| [`examples/03-data-fetching`](./examples/03-data-fetching/)     | SSR / SSG / ISR เปรียบเทียบกัน          |
| [`LAB.md`](./LAB.md)                                            | Catalog + Blog ด้วย App Router          |

```bash
cd examples/01-rsc-vs-rcc && npm install && npm run dev
```

**ถัดไป → [`../03-expert/README.md`](../03-expert/README.md)** (หลังจากทำ Lab ผ่าน)
