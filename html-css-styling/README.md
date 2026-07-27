# Styling & UI Frameworks Bootcamp — Zero to Expert

bootcamp เรียนรู้ **Modern Styling และ UI Frameworks** แบบครบวงจร
จาก Semantic HTML / CSS Layout Engines → SASS & Tailwind → Enterprise Design Systems ด้วย MUI

---

## เป้าหมายของหลักสูตร

เมื่อจบหลักสูตรนี้ คุณจะสามารถ:

- เขียน **HTML5 Semantic Markup** ที่ดีต่อ SEO และ Accessibility (ARIA)
- ควบคุม Layout ด้วย **Flexbox** และ **CSS Grid** ได้อย่างแม่นยำ
- อธิบาย **Box Model, Specificity, Cascade, CSS Variables** และสร้าง Responsive + Animations
- จัดโครงสร้าง CSS ขนาดใหญ่ด้วย **SASS 7-1 Pattern**, Mixins, Functions
- ออกแบบ UI ด้วย **Tailwind CSS** (config, dark mode, component composition ด้วย `clsx` / `tailwind-merge`)
- สร้าง **Design System** ด้วย MUI (`createTheme`, `ThemeProvider`, `sx` vs `styled`)
- แก้ปัญหา production: **CSS Purging, Tree Shaking, Fluid Typography, SSR hydration mismatch**

---

## โครงสร้างหลักสูตร

| Level            | folder                                   | หัวข้อหลัก                                                      | เวลาแนะนำ   |
| ---------------- | ---------------------------------------- | --------------------------------------------------------------- | ----------- |
| 1 — Beginner     | [`01-beginner/`](./01-beginner/)         | Semantic HTML, Box Model, Flexbox, Grid, Variables & Responsive | 1–2 สัปดาห์ |
| 2 — Intermediate | [`02-intermediate/`](./02-intermediate/) | SASS/LESS 7-1, Tailwind config & components                     | 2–3 สัปดาห์ |
| 3 — Expert       | [`03-expert/`](./03-expert/)             | MUI Theme DS, Data Grid/Forms, Performance & SSR                | 2–4 สัปดาห์ |

แต่ละระดับประกอบด้วย:

1. **`README.md`** — ทฤษฎีเชิงลึกภาษาไทย เน้น Grid Layout, CSS Architecture และ Design System
2. **`examples/`** — โค้ดตัวอย่างที่เปิดดู / compile / รันได้จริง
3. **`LAB.md`** — โจทย์สถานการณ์จริงพร้อมเฉลยเต็มใน `lab/solution/`

---

## ข้อกำหนดเบื้องต้น

- ความรู้พื้นฐาน HTML / CSS / JavaScript
- ติดตั้ง [Node.js 20+](https://nodejs.org/)
- browser สมัยใหม่ (Chrome / Firefox / Edge) พร้อม DevTools
- (ระดับ Intermediate+) ติดตั้ง Sass compiler หรือใช้ Vite
- (ระดับ Expert) ความคุ้นเคย React + TypeScript พื้นฐาน

```bash
node -v # ควรเป็น v20.x ขึ้นไป
npm -v
```

---

## วิธีใช้ Bootcamp

1. อ่าน `README.md` ของระดับนั้นให้จบ — โฟกัสที่ **ทำไมออกแบบแบบนี้**
2. เปิดตัวอย่างใน `examples/` ตามลำดับ (ดับเบิลคลิก HTML หรือรัน Vite)
3. ทำ Lab ใน `LAB.md` **ด้วยตัวเองก่อน** แล้วค่อยดูเฉลย
4. ไประดับถัดไปเมื่ออธิบาย trade-off ของการเลือก tooling ได้

```bash
cd styling-ui-bootcamp

# Beginner — เปิดไฟล์ HTML ใน browser โดยตรง
# หรือใช้ live server:
npx --yes serve 01-beginner/examples

# Intermediate — compile SASS
cd 02-intermediate/examples/01-sass-71-pattern
npx --yes sass scss/main.scss css/main.css --watch

# Intermediate — Tailwind demo (Vite)
cd ../03-tailwind-config
npm install && npm run dev

# Expert — MUI theme demo
cd ../../../03-expert/examples/01-mui-theme
npm install && npm run dev
```

---

## Learning Path ที่แนะนำ

```
Beginner: Semantic HTML + Box Model + Flexbox + Grid + Responsive/Animations
 ↓
Intermediate: SASS 7-1 + LESS + Tailwind Config/Dark Mode + Component Composition
 ↓
Expert: MUI Design System + Data Grid/Forms + Performance/SSR
 ↓
project จริงของคุณเอง (Marketing Site / Admin Dashboard / Design System Package)
```

---

## เมื่อไหร่ใช้ CSS ดิบ vs SASS vs Tailwind vs MUI?

| คำถาม                                                          | แนวทาง                                              |
| -------------------------------------------------------------- | --------------------------------------------------- |
| หน้าเล็ก / landing / เรียนรู้ layout engine?                   | CSS ดิบ (+ HTML semantic)                           |
| ทีมต้องการ CSS architecture ที่ maintain ได้ยาว?               | SASS/LESS + 7-1 หรือ CSS Modules                    |
| ต้องการความเร็วในการปั้น UI และ consistency จาก utility?       | Tailwind CSS                                        |
| ต้องการ component library พร้อม a11y + theme สำหรับ admin/app? | MUI (หรือคล้าย ๆ เช่น Chakra, Ant)                  |
| Design System ขององค์กรขนาดใหญ่?                               | Tokens (CSS vars) + Theme layer + Component library |

> **กฎทอง:** อย่าซ้อนเครื่องมือโดยไม่จำเป็น — เลือก **1 แนวหลัก** ต่อ project แล้วใช้ CSS variables / design tokens เป็นสะพานร่วม

---

## Best Practices ข้ามระดับ (สรุปเร็ว)

1. **Semantic HTML ก่อน CSS** — markup ที่ถูกต้องช่วย SEO, a11y และลด CSS ที่ต้องเขียน
2. **Layout ด้วย Flex/Grid ไม่ใช่ float/position เดา** — ใช้ position เมื่อจำเป็นจริง ๆ
3. **Design Tokens เป็นศูนย์กลาง** — สี, spacing, typography อยู่ในตัวแปร ไม่ hardcode ทั่วไฟล์
4. **Mobile-first** — เขียน base สำหรับจอเล็ก แล้วขยายด้วย `min-width`
5. **วัดผล performance** — CLS, CSS bundle size, unused CSS, hydration mismatch
