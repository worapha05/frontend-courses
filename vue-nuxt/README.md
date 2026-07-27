# Vue 3 + Nuxt 3 Bootcamp — Zero to Expert

bootcamp เรียนรู้ **Vue 3 Composition API และ Nuxt 3** แบบครบวงจรสำหรับนักพัฒนาที่มุ่งสู่
**Reactive Frontend · Universal Rendering · Enterprise Dashboards**
จาก Proxy Reactivity → Nuxt Architecture → Performance Grids / RBAC / Nitro

---

## เป้าหมายของหลักสูตร

เมื่อจบหลักสูตรนี้ คุณจะสามารถ:

- อธิบาย **Vue 3 Reactivity System** (`ref` / `reactive` / `computed` / `watch`) ระดับกลไก Proxy
- ออกแบบ Component ด้วย Props, Emit, Slots และ Provide/Inject อย่างถูกต้อง
- สร้างแอป **Nuxt 3** ด้วย auto-imports, file-based routing และ hybrid rendering
- จัดการ state ด้วย **Pinia** และดึงข้อมูลด้วย `useFetch` / `useAsyncData`
- สร้าง Data Grid ประสิทธิภาพสูง, RBAC middleware และ Nitro server routes ระดับ production

---

## โครงสร้างหลักสูตร

| Level            | folder                                   | หัวข้อหลัก                                              | เวลาแนะนำ   |
| ---------------- | ---------------------------------------- | ------------------------------------------------------- | ----------- |
| 1 — Beginner     | [`01-beginner/`](./01-beginner/)         | Reactivity, Components, Forms & Lifecycle               | 1–2 สัปดาห์ |
| 2 — Intermediate | [`02-intermediate/`](./02-intermediate/) | Nuxt Architecture, SSR/SSG/Hybrid, Pinia, Data Fetching | 2–3 สัปดาห์ |
| 3 — Expert       | [`03-expert/`](./03-expert/)             | Data Grids, RBAC Middleware, Nitro Caching & Proxy      | 2–4 สัปดาห์ |

แต่ละระดับประกอบด้วย:

1. **`README.md`** — ทฤษฎีเชิงลึกภาษาไทย เน้น reactivity และ framework mechanics
2. **`examples/`** — โค้ด Composition API / Nuxt ที่รันได้จริง
3. **`LAB.md`** — โจทย์ปฏิบัติขั้นสูงพร้อมเฉลยเต็มใน `lab/solution/`

---

## ข้อกำหนดเบื้องต้น

- ความรู้พื้นฐาน JavaScript (ES6+, modules, async/await)
- ความเข้าใจ HTML/CSS พื้นฐาน
- ติดตั้ง [Node.js 20 LTS+](https://nodejs.org/) (แนะนำ 22+)

```bash
node -v # ควรเป็น v20.x ขึ้นไป
npm -v
```

---

## วิธีใช้ Bootcamp

1. อ่าน `README.md` ของระดับนั้นให้จบก่อน — โฟกัสที่ **ทำไม Vue/Nuxt ทำงานแบบนี้**
2. เปิด `examples/` แล้วรันทีละ project
3. ทำ Lab ใน `LAB.md` **ด้วยตัวเองก่อน** แล้วค่อยดูเฉลย
4. ไประดับถัดไปเมื่ออธิบาย design choice ของตนเองได้

```bash
# Beginner — Vite + Vue 3
cd vue-nuxt-bootcamp/01-beginner/examples/01-reactivity-ref-reactive
npm install && npm run dev

# Intermediate — Nuxt 3
cd vue-nuxt-bootcamp/02-intermediate/examples/01-nuxt-architecture
npm install && npm run dev

# Expert — Data Grid
cd vue-nuxt-bootcamp/03-expert/examples/01-data-grid
npm install && npm run dev
```

---

## Learning Path ที่แนะนำ

```
Beginner: Vue 3 Reactivity + Composition API Components
 ↓
Intermediate: Nuxt 3 Architecture + Pinia + Universal Data Fetching
 ↓
Expert: Enterprise Grid + RBAC + Nitro Server Engine
 ↓
project จริงของคุณเอง (Vue/Nuxt Portfolio)
```

---

## หลักการสำคัญที่หลักสูตรย้ำตลอด

| หลักการ                     | ความหมายใน Vue / Nuxt                                   |
| --------------------------- | ------------------------------------------------------- |
| Reactivity is a graph       | `ref`/`reactive` → dependency tracking → effect re-run  |
| Prefer `ref` for primitives | `reactive` เหมาะกับ object ที่ไม่ถูกแทนที่ทั้งก้อน      |
| Own your boundaries         | Props down / Events up — ไม่ mutate props               |
| Server owns secrets         | API keys / RBAC อยู่ที่ Nitro ไม่โผล่ใน client bundle   |
| Fetch with keys             | `useAsyncData` key ป้องกัน duplicate requests           |
| Cache intentionally         | Nitro `cachedEventHandler` มี TTL และ invalidation plan |

---

## Tech Stack มาตรฐานของหลักสูตร

| ชั้น            | เทคโนโลยี                                    |
| --------------- | -------------------------------------------- |
| UI Library      | Vue 3.5+ (Composition API, `<script setup>`) |
| Meta Framework  | Nuxt 3.x                                     |
| State           | Pinia                                        |
| Styling         | Tailwind CSS (Expert)                        |
| Server          | Nitro (h3)                                   |
| Bundler         | Vite                                         |
| Package manager | npm                                          |
