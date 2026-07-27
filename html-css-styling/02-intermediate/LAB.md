# Lab ระดับ Intermediate — Mini Design System “Harbor UI”

## เป้าหมาย

สร้างชุด UI พื้นฐานของผลิตภัณฑ์จำลอง **Harbor UI** โดยใช้ทั้งสองแนวทาง:

1. **SASS 7-1** สำหรับ marketing shell (header + card grid)
2. **Tailwind + React components** สำหรับ app primitives (Button / Input / Modal)

พร้อมแก้ปัญหา CSS/Responsive ที่พบบ่อยในทีมจริง

ทำด้วยตัวเองก่อน แล้วค่อยเทียบ [`lab/solution/`](./lab/solution/)

---

## กรณีศึกษา

startup **Harbor** มีสองทีม:

- ทีม Brand ใช้ SCSS จัดหน้า marketing
- ทีม Product ใช้ React + Tailwind ในแอป

ตอนนี้เกิดปัญหา:

| อาการ                                    | สาเหตุ                            |
| ---------------------------------------- | --------------------------------- |
| สี brand ไม่ตรงกันระหว่างเว็บกับแอป      | ไม่มี token ร่วม / config คนละชุด |
| ปุ่มในแอปมี class ยาว copy-paste 20 ที่  | ไม่มี component abstraction       |
| Modal เปิดแล้ว Scroll ด้านหลังยังเลื่อน  | ไม่ lock body scroll              |
| Dark mode แอปทำงาน แต่ marketing ไม่สลับ | theme อยู่คนละกลไก                |
| Build Tailwind แล้วบาง class หาย         | `content` paths ไม่ครบ            |

CTO ต้องการ **Harbor UI v1** ที่:

- SCSS ตาม 7-1 มี `abstracts` + `components/button` + `components/card`
- React มี `Button`, `Input`, `Modal` ใช้ `cn()` จาก `clsx` + `tailwind-merge`
- `tailwind.config.js` ใช้สี brand ชุดเดียวกับ SASS variables (ค่า hex ตรงกัน)
- มี dark mode แบบ `class` ในแอป

---

## โจทย์

### ส่วนที่ 1 — SASS 7-1 Marketing Shell

สร้างโครงอย่างน้อย:

```
scss/
 abstracts/_variables.scss
 abstracts/_mixins.scss
 base/_reset.scss
 layout/_header.scss
 components/_button.scss
 components/_card.scss
 themes/_dark.scss
 main.scss
```

ข้อกำหนด:

- Variables ต้องมี `$color-brand: #0f766e` (หรือเทียบเท่า scale)
- Mixin `respond-to` และ `focus-ring`
- หน้า `index.html` มี header + การ์ด 3 ใบ + ปุ่ม primary/ghost
- รองรับ `[data-theme="dark"]`

### ส่วนที่ 2 — Tailwind Config

สร้าง `tailwind.config.js` ที่:

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          600: '#0d9488',
          700: '#0f766e',
          900: '#134e4a',
        },
      },
    },
  },
  plugins: [],
};
```

### ส่วนที่ 3 — React Components

Implement:

1. **`cn()`** — `twMerge(clsx(...))`
2. **`Button`** — variants: `primary | ghost | danger`, sizes: `sm | md`
3. **`Input`** — มี label, แสดง error, ตั้ง `aria-invalid` / `aria-describedby`
4. **`Modal`** — `role="dialog"`, ปิดด้วย Escape และคลิก backdrop, **ล็อก `document.body.style.overflow`** ตอนเปิด

หน้า demo ต้องมี form อีเมลสั้น ๆ ที่เปิด modal ยืนยัน

### ส่วนที่ 4 — สถานการณ์ Responsive พัง (ต้องแก้ให้ครบ)

จำลองแล้วแก้ในโค้ดของคุณ:

1. **การ์ดบนมือถือล้นจอ** เพราะมี `min-width: 320px` คงที่ 3 column → ใช้ mixin respond-to หรือ grid 1 column ก่อน
2. **ปุ่ม `className="px-2"` ทับ size ของ Button ไม่ได้** เพราะรวม string ดิบ → ต้องผ่าน `cn()` / `twMerge`
3. **Input error สีแดงแต่ screen reader ไม่รู้** → ผูก `aria-describedby`

### ส่วนที่ 5 — คำถามคิด (`NOTES.md`)

1. เมื่อไหร่ควรเก็บสีเป็น SASS `$variable` และเมื่อไหร่ควรเป็น CSS `var(--token)`?
2. ทำไม `tailwind-merge` จำเป็นเมื่อมี `className` override จากภายนอก?
3. ข้อเสียของ `@apply` ใน Tailwind ที่ควรระวัง?

---

## เกณฑ์ผ่าน

- [ ] SASS โครงสร้าง 7-1 compile ได้
- [ ] สี brand ตรงกันระหว่าง SCSS กับ Tailwind config
- [ ] Button / Input / Modal ทำงานครบรวม a11y พื้นฐาน
- [ ] Modal ล็อกสกอร์ลพื้นหลัง
- [ ] แก้เคส responsive / merge class / aria ครบ
- [ ] มี `NOTES.md`

---

## เฉลย

ดู [`lab/solution/`](./lab/solution/)

```bash
# SASS
cd 02-intermediate/lab/solution
npx --yes sass scss/main.scss css/main.css

# React + Tailwind
npm install
npm run dev
```
