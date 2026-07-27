# Level 3 — Expert: Enterprise Scale & Optimization

เป้าหมายระดับนี้: ให้คุณสร้างแอป Next.js ที่ **scale ได้ทั้ง state, performance และ full-stack patterns**
พร้อมตัดสินใจเรื่อง Zustand vs Redux Toolkit, Core Web Vitals และขอบเขตของ Middleware / Server Actions

---

## สารบัญ

1. [State Management ที่ Scale](#1-state-management-ที่-scale)
2. [Zustand — เบาและตรงประเด็น](#2-zustand--เบาและตรงประเด็น)
3. [Redux Toolkit — เมื่อทีมใหญ่และ flow ซับซ้อน](#3-redux-toolkit--เมื่อทีมใหญ่และ-flow-ซับซ้อน)
4. [Performance Tuning & Core Web Vitals](#4-performance-tuning--core-web-vitals)
5. [Server Actions](#5-server-actions)
6. [Route Handlers + ORM Patterns](#6-route-handlers--orm-patterns)
7. [Middleware (Edge Auth / Redirects)](#7-middleware-edge-auth--redirects)
8. [Dashboard Grids ด้วย Tailwind](#8-dashboard-grids-ด้วย-tailwind)
9. [Best Practices สรุป](#9-best-practices-สรุป)

---

## 1. State Management ที่ Scale

ลำดับการเลือกที่หลักสูตรแนะนำ:

```
1. Server state (RSC / fetch / Server Actions) ก่อน
2. URL state (searchParams) สำหรับ filter ที่แชร์ได้
3. Local useState / useReducer
4. Context สำหรับ theme / auth session เบา ๆ
5. Zustand หรือ Redux Toolkit เมื่อ client global state ซับซ้อนจริง
```

| สถานการณ์                                     | เครื่องมือ                |
| --------------------------------------------- | ------------------------- |
| ข้อมูลจาก DB ที่แสดงอย่างเดียว                | RSC + cache               |
| Form wizard หลายขั้นในหน้าเดียว               | `useReducer`              |
| Cart / UI preferences ข้ามหน้า                | Zustand                   |
| Audit trail, middleware, ทีมใหญ่, time-travel | Redux Toolkit             |
| Server cache + mutation sync                  | TanStack Query (เสริมได้) |

**กฎ:** อย่าใส่ server data ทั้งก้อนลง client store ถ้าไม่จำเป็น — จะ duplicate source of truth

---

## 2. Zustand — เบาและตรงประเด็น

```tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = { id: string; name: string; qty: number };

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, 'qty'>) => void;
  remove: (id: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i)),
            };
          }
          return { items: [...state.items, { ...item, qty: 1 }] };
        }),
      remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
    }),
    { name: 'cart' },
  ),
);
```

### Best practices ของ Zustand

- แยก store ตาม domain (`cartStore`, `uiStore`)
- ใช้ selector แคบ: `useCartStore((s) => s.items.length)` เพื่อลด re-render
- `persist` เฉพาะสิ่งที่ควรอยู่รอดหลัง reload
- อย่าใส่ non-serializable (Map, class instance) ใน persist

---

## 3. Redux Toolkit — เมื่อทีมใหญ่และ flow ซับซ้อน

RTK เหมาะเมื่อมี:

- Action ที่ต้อง log / analytics กลาง
- Logic ที่หลายทีมแตะร่วมกัน
- ต้องการ DevTools + pattern มาตรฐาน (slice, thunk)

```tsx
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type UiState = { sidebarOpen: boolean; dense: boolean };

const uiSlice = createSlice({
  name: 'ui',
  initialState: { sidebarOpen: true, dense: false } satisfies UiState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen; // Immer ในbuilt-in
    },
    setDense(state, action: PayloadAction<boolean>) {
      state.dense = action.payload;
    },
  },
});

export const { toggleSidebar, setDense } = uiSlice.actions;
export default uiSlice.reducer;
```

**เลือก Zustand เป็นค่าเริ่มต้นของหลักสูตร Expert** — เพิ่ม RTK เมื่อทีมต้องการ convention หนักกว่า

---

## 4. Performance Tuning & Core Web Vitals

### ตัวชี้วัดหลัก

| Metric  | ความหมาย                          | เป้าคร่าว ๆ |
| ------- | --------------------------------- | ----------- |
| **LCP** | องค์ประกอบใหญ่ที่สุดโผล่เมื่อไหร่ | ≤ 2.5s      |
| **INP** | ความหน่วงของการโต้ตอบ             | ≤ 200ms     |
| **CLS** | หน้ากระตุกจากการเลื่อน layout     | ≤ 0.1       |

### เทคนิคใน Next.js

1. **Code splitting / Dynamic import**

```tsx
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <p>กำลังโหลดกราฟ...</p>,
  ssr: false, // ถ้าใช้ browser-only API
});
```

2. **`next/image`** — บังคับขนาด, lazy, modern formats
3. **`next/font`** — ลด CLS จาก web font
4. **ลด JS ใน critical path** — ดันงานไป RSC
5. **Streaming + `loading.tsx`** — แสดง shell เร็วขึ้น

```tsx
import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
```

---

## 5. Server Actions

Server Actions = function server ที่เรียกจาก form / client ได้โดยไม่ต้องเขียน API เองทุกครั้ง

```tsx
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  title: z.string().trim().min(1).max(100),
});

export async function createTodo(formData: FormData) {
  const parsed = schema.safeParse({ title: formData.get('title') });
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten() };
  }

  // await db.todo.create({ data: parsed.data })
  revalidatePath('/dashboard');
  return { ok: true as const };
}
```

```tsx
// Client / Server Component ที่เป็น form
<form action={createTodo}>
  <input name="title" required />
  <button type="submit">เพิ่ม</button>
</form>
```

### เมื่อใช้ Action vs Route Handler

| ใช้ Server Action       | ใช้ Route Handler           |
| ----------------------- | --------------------------- |
| Form ในแอปเดียวกัน      | Public REST / webhook       |
| Progressive enhancement | Mobile / บุคคลที่สาม        |
| `revalidatePath` ทันที  | ต้องการ HTTP semantics เต็ม |

---

## 6. Route Handlers + ORM Patterns

แม้ใน lab จะใช้ in-memory store แต่ pattern โปรดักชันควรเป็น:

```
Route Handler / Server Action
 → Validate (Zod)
 → Use-case / service
 → ORM repository (Prisma / Drizzle)
 → DB
```

อย่าเรียก ORM จาก Client Component
อย่าส่ง connection string ผ่าน `NEXT_PUBLIC_*`

ตัวอย่าง handler:

```tsx
export async function POST(request: Request) {
  const body = await request.json();
  const parsed = todoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }
  const todo = await todoRepo.create(parsed.data);
  return NextResponse.json(todo, { status: 201 });
}
```

---

## 7. Middleware (Edge Auth / Redirects)

`middleware.ts` ที่ root ของ project รันบน **Edge** ก่อนเข้าถึงหน้า

เหมาะกับ:

- ตรวจ cookie/session แล้ว redirect
- ใส่ headers (CSP, geo)
- A/B flag เบา ๆ

ไม่เหมาะกับ:

- เรียก DB หนัก / business logic ซับซ้อน
- งานที่ใช้ Node API ที่ Edge ไม่รองรับ

```tsx
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

---

## 8. Dashboard Grids ด้วย Tailwind

หลักการที่ responsive:

- Mobile-first: `grid-cols-1` → `md:grid-cols-2` → `xl:grid-cols-4`
- แยก **KPI cards**, **ตาราง**, **ชาร์ต** เป็นโซนชัดเจน
- ใช้ `gap` สม่ำเสมอ และหลีกเลี่ยง fixed width ที่พังบนจอแคบ
- Virtualize ตารางยาวมาก (เช่น `@tanstack/react-virtual`) เมื่อแถวเป็นพัน

รายละเอียดโค้ดอยู่ใน `examples/03-fullstack-patterns` และ Lab

---

## 9. Best Practices สรุป

| หลักการ         | ทำ                          | อย่าทำ                                  |
| --------------- | --------------------------- | --------------------------------------- |
| Source of truth | Server สำหรับ server data   | sync ซ้ำใน Zustand โดยไม่จำเป็น         |
| Auth            | Middleware สำหรับ gate      | business authorization ทั้งก้อนที่ Edge |
| Mutations       | Server Actions + revalidate | mutate แล้วหวังว่า client cache ถูกเอง  |
| Perf            | Dynamic import ของของหนัก   | โหลด chart library ใน root layout       |
| Images/Fonts    | `next/image` + `next/font`  | `<img>` ไร้ขนาด + layout shift          |
| Types           | Zod ที่ขอบเขต I/O           | เชื่อ JSON จาก client ตรง ๆ             |

---

## ไฟล์ในระดับนี้

| folder                                                                | เนื้อหา                               |
| --------------------------------------------------------------------- | ------------------------------------- |
| [`examples/01-state-management`](./examples/01-state-management/)     | Zustand (+ แนว RTK)                   |
| [`examples/02-performance-cwv`](./examples/02-performance-cwv/)       | Dynamic import, Image, Font           |
| [`examples/03-fullstack-patterns`](./examples/03-fullstack-patterns/) | Server Actions, Middleware, Dashboard |
| [`LAB.md`](./LAB.md)                                                  | Ops Dashboard ระดับ Enterprise mini   |

```bash
cd examples/03-fullstack-patterns && npm install && npm run dev
```

**จบหลักสูตร → กลับ [`../README.md`](../README.md) แล้วสร้าง Portfolio ของคุณเอง**
