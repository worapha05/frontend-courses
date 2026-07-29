📍 **Nav:** [`🏠 Dev Learning Courses Hub`](https://github.com/worapha05/dev-learning-courses-hub/blob/main/README.md) | [`📂 Frontend Courses Index`](../README.md) | [`📝 Prompt File`](https://github.com/worapha05/ai-learning-prompts-hub/blob/main/course-generation/frontend-courses/react-next-prompt.md)

---

# React & Next.js Bootcamp — Zero to Expert

bootcamp เรียนรู้ **Modern React + Next.js (App Router)** แบบครบวงจรสำหรับ
**Full-stack Developers**
จาก React Core → Next.js Framework → Enterprise Scale & Optimization

---

## เป้าหมายของหลักสูตร

เมื่อจบหลักสูตรนี้ คุณจะสามารถ:

- เขียน Functional Components ด้วย TypeScript, Props และ Immutable State อย่างถูกต้อง
- ใช้ Lifecycle Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`) เพื่อควบคุม performance
- จัดการ Global State ด้วย Context API และ Form Validation แบบเข้มงวด
- แยก **Server Components (RSC)** กับ **Client Components (RCC)** ใน Next.js App Router
- ออกแบบ File-based Routing, Layouts, Templates และ Route Handlers
- เลือก Data Fetching Strategy: SSR / SSG / ISR ให้เหมาะกับ use case
- Scale state ด้วย Zustand หรือ Redux Toolkit และ tune Core Web Vitals
- สร้าง Full-stack patterns ด้วย Server Actions, Middleware Auth และ Dashboard UI

---

## โครงสร้างหลักสูตร

| Level            | folder                                   | หัวข้อหลัก                                   | เวลาแนะนำ   |
| ---------------- | ---------------------------------------- | -------------------------------------------- | ----------- |
| 1 — Beginner     | [`01-beginner/`](./01-beginner/)         | Components, Hooks, Context, Forms            | 1–2 สัปดาห์ |
| 2 — Intermediate | [`02-intermediate/`](./02-intermediate/) | App Router, RSC/RCC, Routing, SSR/SSG/ISR    | 2–3 สัปดาห์ |
| 3 — Expert       | [`03-expert/`](./03-expert/)             | Zustand/RTK, CWV, Server Actions, Middleware | 2–4 สัปดาห์ |

แต่ละระดับประกอบด้วย:

1. **`README.md`** — ทฤษฎีเชิงลึกภาษาไทย + Best Practices
2. **`examples/`** — โค้ด React/Next.js (TypeScript) ที่รันได้จริง
3. **`LAB.md`** — โจทย์ปฏิบัติพร้อมเฉลยเต็มใน `lab/solution/`

---

## ข้อกำหนดเบื้องต้น

- ความรู้พื้นฐาน JavaScript/TypeScript (ตัวแปร, function, async/await, modules)
- เคยพัฒนา Web/API มาบ้าง (Backend ใดก็ได้)
- ติดตั้ง [Node.js 20 LTS+](https://nodejs.org/) (แนะนำ 22+)
- รู้จัก HTML/CSS พื้นฐาน

```bash
node -v # ควรเป็น v20.x ขึ้นไป
npm -v
```

---

## วิธีใช้ Bootcamp

1. อ่าน `README.md` ของระดับนั้นให้จบก่อน — โฟกัสที่ **ทำไม React/Next ออกแบบแบบนี้**
2. เปิด `examples/` แล้วรันทีละ project
3. ทำ Lab ใน `LAB.md` **ด้วยตัวเองก่อน** แล้วค่อยดูเฉลย
4. ไประดับถัดไปเมื่ออธิบาย design choice ของตนเองได้

```bash
# Beginner — Vite + React
cd react-next-bootcamp/01-beginner/examples/01-components-props-state
npm install && npm run dev

# Intermediate — Next.js App Router
cd react-next-bootcamp/02-intermediate/examples/01-rsc-vs-rcc
npm install && npm run dev

# Expert — Full-stack patterns
cd react-next-bootcamp/03-expert/examples/03-fullstack-patterns
npm install && npm run dev
```

---

## Learning Path ที่แนะนำ

```
Beginner: React Core + Hooks + Context/Forms
 ↓
Intermediate: Next.js App Router + Data Fetching
 ↓
Expert: State at Scale + CWV + Server Actions/Middleware
 ↓
project จริงของคุณเอง (Full-stack Portfolio)
```

---

## หลักการสำคัญที่หลักสูตรย้ำตลอด

| หลักการ                 | ความหมายใน React / Next.js                                            |
| ----------------------- | --------------------------------------------------------------------- |
| UI = f(state)           | UI คือผลลัพธ์ของ state — อย่า mutate โดยตรง                           |
| Server-first            | เริ่มจาก Server Component แล้วค่อยใส่ `"use client"` เมื่อจำเป็น      |
| Fetch where data lives  | ดึงข้อมูลใกล้แหล่งข้อมูล (server) ไม่ใช่ waterfall จาก client         |
| Colocate state          | เก็บ state ใกล้ผู้ใช้ที่สุด — ยกขึ้นเมื่อจำเป็นต้อง share             |
| Measure before optimize | `useMemo`/`useCallback` มีต้นทุน — ใช้เมื่อวัดแล้วมีปัญหา             |
| Edge for auth           | Middleware ที่ Edge เหมาะกับ redirect/auth ไม่ใช่ business logic หนัก |

---

## Tech Stack มาตรฐานของหลักสูตร

| ชั้น               | เทคโนโลยี               |
| ------------------ | ----------------------- |
| Language           | TypeScript 5+           |
| UI Library         | React 19                |
| Framework          | Next.js 15 (App Router) |
| Bundler (Beginner) | Vite 6                  |
| Styling            | Tailwind CSS 4          |
| Forms              | Controlled inputs + Zod |
| Client state       | Zustand / Redux Toolkit |
| Package manager    | npm                     |
