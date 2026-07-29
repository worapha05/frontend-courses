📍 **Nav:** [`🏠 Dev Learning Courses Hub`](https://github.com/worapha05/dev-learning-courses-hub/blob/main/README.md) | [`📂 Frontend Courses Index`](../README.md) | 📝 [`Prompt File`](https://github.com/worapha05/ai-learning-prompts-hub/blob/main/course-generation/frontend-courses/state-management-prompt.md)

---

# State Management Bootcamp — Zero to Expert

bootcamp เรียนรู้ **Advanced State Management และ Server State Caching** แบบครบวงจร
เน้น **Redux Toolkit (RTK), NgRx, TanStack Query (React Query), และ Apollo Client**
จาก State Paradigms → Reactive Store / Cache Architecture → Optimistic UI / Real-time Sync / Offline-first

---

## เป้าหมายของหลักสูตร

เมื่อจบหลักสูตรนี้ คุณจะสามารถ:

- แยก **Client State** กับ **Server State** และเลือก Local vs Global ได้ถูกต้อง
- สร้าง Store ด้วย **Redux Toolkit**: Slices, Actions, Reducers, Selectors, Hooks
- ออกแบบ **NgRx** สำหรับ Angular enterprise: Actions → Reducers → Selectors → Effects (RxJS)
- จัดการ Server Cache ด้วย **TanStack Query**: `staleTime` / `gcTime`, pagination, infinite query, mutation invalidation
- ใช้ **Apollo Client** แบบ Normalized Cache, cache read/write และ Local State (`@client`)
- Implement **Optimistic UI**, รวม Redux/NgRx กับ Server State โดยไม่ duplicate ข้อมูล
- ออกแบบ Real-time Sync, Offline-first และ Prefetch เพื่อ UX ที่ใกล้ zero-latency

---

## โครงสร้างหลักสูตร

| Level            | folder                                   | หัวข้อหลัก                                                   | เวลาแนะนำ   |
| ---------------- | ---------------------------------------- | ------------------------------------------------------------ | ----------- |
| 1 — Beginner     | [`01-beginner/`](./01-beginner/)         | State paradigms, RTK foundations, RQ/Apollo basics           | 1–2 สัปดาห์ |
| 2 — Intermediate | [`02-intermediate/`](./02-intermediate/) | NgRx Effects, RQ advanced cache, Apollo normalized cache     | 2–3 สัปดาห์ |
| 3 — Expert       | [`03-expert/`](./03-expert/)             | Optimistic UI, RTK+RQ integration, realtime/offline/prefetch | 2–4 สัปดาห์ |

แต่ละระดับประกอบด้วย:

1. **`README.md`** — ทฤษฎีเชิงลึกภาษาไทย: Client vs Server State, Data Flow, Best Practices
2. **`examples/`** — โค้ด TypeScript สมัยใหม่ (Store / Query / Apollo config)
3. **`LAB.md`** — โจทย์สถานการณ์จริงพร้อมเฉลยเต็มใน `lab/solution/`

---

## ข้อกำหนดเบื้องต้น

- TypeScript พื้นฐาน (types, generics, modules, async/await)
- React hooks พื้นฐาน (`useState`, `useEffect`) — และ/หรือ Angular basics สำหรับ NgRx
- ความเข้าใจ REST / GraphQL ระดับใช้งานได้
- ติดตั้ง [Node.js 20+](https://nodejs.org/)

```bash
node -v # ควรเป็น v20.x ขึ้นไป
npm -v
```

---

## วิธีใช้ Bootcamp

1. ติดตั้ง dependencies ที่ root ของ bootcamp
2. อ่าน `README.md` ของระดับนั้นให้จบ — โฟกัสว่า **state ชนิดไหนควรอยู่ที่ไหน**
3. อ่านและรัน/ศึกษาตัวอย่างใน `examples/` ตามลำดับ
4. ทำ Lab ใน `LAB.md` **ด้วยตัวเองก่อน** แล้วค่อยดูเฉลย
5. ไประดับถัดไปเมื่ออธิบาย trade-off ของ data flow ได้

```bash
cd state-management-bootcamp
npm install

# ตรวจ TypeScript ของ examples (pattern modules)
npm run typecheck

# Beginner: รัน mini Vite app ได้จริง (ติดตั้ง deps ของแอปก่อนครั้งแรก)
npm run install:beginner
npm run dev:beginner
# → http://localhost:5173
```

> **Beginner มีแอปที่รันได้:** [`01-beginner/examples/05-vite-shopdesk/`](./01-beginner/examples/05-vite-shopdesk/)
> รวม RTK + React Query + Apollo ในหน้าเดียว
>
> ตัวอย่างอื่นยังเป็น **educational TypeScript modules** สำหรับอ่าน/`tsc`
> NgRx ออกแบบให้ใช้ใน Angular app — ไม่รันด้วย `node` เปล่า

---

## Learning Path ที่แนะนำ

```
Beginner: Client vs Server State + RTK Slices + useQuery / Apollo basics
 ↓
Intermediate: NgRx Effects + gcTime/staleTime/Infinite Query + Normalized Cache
 ↓
Expert: Optimistic UI + RTK↔RQ Integration + WebSocket/Offline/Prefetch
 ↓
project จริงของคุณเอง (Admin Dashboard / Marketplace / Collaborative App)
```

---

## เมื่อไหร่ใช้เครื่องมือไหน?

| คำถาม                                                    | แนวทาง                                                            |
| -------------------------------------------------------- | ----------------------------------------------------------------- |
| UI state (modal, sidebar, form draft, theme)?            | Local state / Context / RTK หรือ Zustand — **ไม่ใช่** React Query |
| ข้อมูลจาก API ที่ต้อง sync, cache, refetch?              | **TanStack Query** หรือ **Apollo** (ถ้า GraphQL)                  |
| Business workflow ซับซ้อน + audit ของ state transitions? | **Redux Toolkit** หรือ **NgRx**                                   |
| Angular enterprise + RxJS-first team?                    | **NgRx**                                                          |
| GraphQL + normalized entities ข้ามหลาย queries?          | **Apollo Client**                                                 |
| REST + ต้องการ cache/invalidation เร็ว?                  | **TanStack Query** (+ RTK สำหรับ UI-only)                         |

> **กฎทอง:** Server State ไม่ควร copy เข้า Redux/NgRx เป็น source of truth อีกชั้น
> ให้ Server Cache เป็นเจ้าของข้อมูลจาก API — Client Store เก็บเฉพาะ UI / domain workflow

---

## Best Practices ข้ามระดับ (สรุปเร็ว)

1. **แยก Client State กับ Server State ชัดเจน** — อย่าใส่ API response ทั้งก้อนลง Redux โดยไม่จำเป็น
2. **กำหนด ownership ของข้อมูล** — ใครเป็น source of truth: server cache หรือ client store?
3. **Selectors ต้อง selective และ memoized** — โดยเฉพาะ data grid ขนาดใหญ่
4. **Mutation ต้องมีแผน invalidate / optimistic / rollback**
5. **ทดสอบ failure path** — network error, stale cache, race condition — ไม่ใช่แค่ happy path
