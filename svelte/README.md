# Svelte Mastery Bootcamp — Zero to Expert

bootcamp เรียนรู้ **Svelte 5 และ SvelteKit** แบบครบวงจรสำหรับนักพัฒนาที่มุ่งสู่
**Compiler-first Architecture · Fine-grained Reactivity · High-Performance Web Apps**
จาก True Reactivity → SvelteKit Essentials → Enterprise Hydration / SSR / Hooks

---

## เป้าหมายของหลักสูตร

เมื่อจบหลักสูตรนี้ คุณจะสามารถ:

- อธิบายความต่างของ **Compiler vs Virtual DOM** และทำไม Svelte ได้ zero-runtime overhead
- ใช้ **Svelte 5 Runes** (`$state`, `$derived`, `$effect`, `$props`, `$inspect`) ออกแบบ data flow ที่ predict ได้
- สร้าง Component ด้วย logic blocks, snippets, props และ event handling อย่างถูกต้อง
- จัดการ state ด้วย **Stores + Context API** และ animation / lifecycle ของ Svelte
- สร้างแอป **SvelteKit** ด้วย file-based routing, `load`, และ Form Actions
- ปรับประสิทธิภาพ Data Grid, เลือก SSR/SSG/SPA ต่อ route, และสร้าง Hooks สำหรับ JWT/RBAC

---

## โครงสร้างหลักสูตร

| Level            | folder                                   | หัวข้อหลัก                                                       | เวลาแนะนำ   |
| ---------------- | ---------------------------------------- | ---------------------------------------------------------------- | ----------- |
| 1 — Beginner     | [`01-beginner/`](./01-beginner/)         | Compiler, Runes Reactivity, Templating & Components              | 1–2 สัปดาห์ |
| 2 — Intermediate | [`02-intermediate/`](./02-intermediate/) | Stores/Context, Transitions, SvelteKit Routing/Load/Form Actions | 2–3 สัปดาห์ |
| 3 — Expert       | [`03-expert/`](./03-expert/)             | Data Grid Perf, SSR/SSG/SPA Adapters, Hooks Auth/RBAC/ORM        | 2–4 สัปดาห์ |

แต่ละระดับประกอบด้วย:

1. **`README.md`** — ทฤษฎีเชิงลึกภาษาไทย เน้น Compiler-first Architecture และ Reactivity System
2. **`examples/`** — โค้ด Svelte / SvelteKit (TypeScript) ที่รันได้จริง
3. **`LAB.md`** — โจทย์สถานการณ์จริงพร้อมเฉลยเต็มใน `lab/solution/`

---

## ข้อกำหนดเบื้องต้น

- ความรู้พื้นฐาน JavaScript/TypeScript (ES modules, async/await)
- ความเข้าใจ HTML/CSS พื้นฐาน
- ติดตั้ง [Node.js 20 LTS+](https://nodejs.org/) (แนะนำ 22+)

```bash
node -v # ควรเป็น v20.x ขึ้นไป
npm -v
```

---

## วิธีใช้ Bootcamp

1. อ่าน `README.md` ของระดับนั้นให้จบก่อน — โฟกัสที่ **ทำไม Svelte compile แบบนี้**
2. เปิด `examples/` แล้วรันทีละ project
3. ทำ Lab ใน `LAB.md` **ด้วยตัวเองก่อน** แล้วค่อยดูเฉลย
4. ไประดับถัดไปเมื่ออธิบาย design choice ของตนเองได้

```bash
# Beginner — Vite + Svelte 5
cd svelte-mastery-bootcamp/01-beginner/examples/01-compiler-reactivity
npm install && npm run dev

# Intermediate — SvelteKit
cd svelte-mastery-bootcamp/02-intermediate/examples/03-sveltekit-routing-load
npm install && npm run dev

# Expert — Data Grid
cd svelte-mastery-bootcamp/03-expert/examples/01-data-grid-performance
npm install && npm run dev
```

---

## Learning Path ที่แนะนำ

```
Beginner: Compiler-first + Runes Reactivity + Components/Snippets
 ↓
Intermediate: Stores/Context + Transitions + SvelteKit Load & Form Actions
 ↓
Expert: Perf Grid + Rendering Strategies + Hooks JWT/RBAC + ORM
 ↓
project จริงของคุณเอง (Dashboard / SaaS / Marketing Site hybrid)
```

---

## Svelte vs React/Vue — เมื่อไหร่เลือก Svelte?

| คำถาม                                                                 | แนวทาง                                        |
| --------------------------------------------------------------------- | --------------------------------------------- |
| ต้องการ bundle เล็ก + update DOM ตรง ๆ โดยไม่ผ่าน VDOM?               | Svelte                                        |
| ทีมใหญ่มี ecosystem / hiring pool ของ React อยู่แล้ว?                 | React มักปลอดภัยกว่าด้าน talent               |
| ต้องการ fullstack framework ที่ opinionated น้อยกว่า Next แต่ครบ SSR? | SvelteKit                                     |
| ต้องการ fine-grained reactivity แบบ compile-time?                     | Svelte 5 Runes                                |
| ต้องแชร์ component ข้ามหลาย framework?                                | พิจารณา Web Components / shared design tokens |

> **กฎทอง:** Svelte ไม่ได้ "เร็วเพราะ magic" — เร็วเพราะ **compile งานที่ runtime อื่นต้องทำทุกครั้ง ให้เสร็จตอน build**

---

## Best Practices ข้ามระดับ (สรุปเร็ว)

1. **คิดเป็น data flow** — `$state` เก็บแหล่งความจริง, `$derived` คำนวณ, `$effect` ทำ side effect เท่านั้น
2. **อย่า mutate prop** — one-way data flow; ส่ง callback / bind อย่างตั้งใจ
3. **เลือกที่เก็บ state ให้ถูกชั้น** — local → context → store → server `load` / Form Actions
4. **แยก `.server.ts` ออกจาก client** — secrets และ DB อยู่ฝั่ง server เท่านั้น
5. **วัดก่อน optimize** — virtualize grid เมื่อข้อมูลใหญ่จริง ไม่ใช่ทุกตาราง
