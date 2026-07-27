# Lab ระดับ Beginner — Landing Page “Nori Press”

## เป้าหมาย

สร้างหน้า Landing ของสำนักพิมพ์ดิจิทัลจำลอง **Nori Press** โดยใช้:

- HTML5 Semantic Tags + ARIA landmarks ที่ถูกต้อง
- CSS Variables เป็น design tokens
- Flexbox สำหรับ navbar และ CTA group
- CSS Grid สำหรับโครงหน้าและ card gallery
- Responsive (mobile-first) + transition ที่เคารพ `prefers-reduced-motion`

ทำด้วยตัวเองก่อน แล้วค่อยเทียบกับ [`lab/solution/`](./lab/solution/)

---

## กรณีศึกษา

ทีม marketing ของ **Nori Press** มีหน้าเว็บเก่าที่เต็มไปด้วย `<div>` ซ้อนกัน
และใช้ `float` จัด column — พอเปิดบนมือถือ เมนูทับเนื้อหา การ์ดสูงไม่เท่ากัน
และไม่มี skip link สำหรับผู้ใช้ keyboard

Lead Designer ส่ง brief มาว่า:

1. ต้องมี landmark ครบ: header / nav / main / article / aside / footer
2. Desktop: sidebar ขวาแสดง “หนังสือแนะนำ”
3. Mobile: sidebar เลื่อนไปอยู่ใต้บทความหลัก
4. การ์ดหนังสือ 3 เล่มเรียงเป็น grid ที่หด/ขยายเอง
5. สีและ spacing ต้องมาจาก CSS variables เท่านั้น (ห้าม hardcode สีใน selector ย่อยโดยตรง — ยกเว้นค่าใน `:root`)

---

## โจทย์

### ส่วนที่ 1 — Semantic HTML

สร้าง `index.html` ที่มีอย่างน้อย:

- Skip link ไป `#main`
- `<header>` ที่มี brand **Nori Press** และ `<nav aria-label="หลัก">`
- `<main id="main">` ภายในมี `<article>` บทความแนะนำ 1 ชิ้น
- `<aside aria-label="หนังสือแนะนำ">` มีรายการ 3 เล่ม
- `<footer>` มีอีเมลติดต่อและ copyright

### ส่วนที่ 2 — Design Tokens

ใน `styles.css` กำหนดอย่างน้อย:

```css
:root {
 --color-bg
 --color-surface
 --color-ink
 --color-muted
 --color-accent
 --space-2 / --space-4 / --space-6
 --radius
 --font-sans
}
```

### ส่วนที่ 3 — Layout Engines

1. **Navbar:** Flexbox — brand ซ้าย, link ขวา
2. **Main layout:** Grid 2 column บนจอ ≥ 800px (`main` | `aside`) และ 1 column บนมือถือ
3. **Book cards ใน aside หรือ section แยก:**
   `grid-template-columns: repeat(auto-fit, minmax(160px, 1fr))`

### ส่วนที่ 4 — Responsive & Motion (สถานการณ์พังจริง)

จำลองบั๊กที่พบบ่อยแล้วแก้ให้ครบ:

| อาการ                              | สาเหตุที่พบบ่อย                                     | สิ่งที่ต้องทำ                                        |
| ---------------------------------- | --------------------------------------------------- | ---------------------------------------------------- |
| เมนูล้นจอมือถือ                    | `display:flex` ไม่ wrap และมี `white-space: nowrap` | ให้ link wrap หรือซ่อนเป็นรายการสั้นลงบนมือถือ       |
| การ์ดสูงไม่เท่า / ปุ่มลอยคนละระดับ | ไม่ได้ใช้ flex column + `margin-top: auto`          | จัดปุ่มชิดล่างการ์ด                                  |
| Animation ทำให้เวียนหัว            | ไม่มี reduced-motion                                | ปิด animation เมื่อ `prefers-reduced-motion: reduce` |
| กล่องกว้างเกิน parent              | ลืม `box-sizing: border-box`                        | ใส่ global border-box                                |

เพิ่ม hover transition ให้ปุ่ม CTA (เปลี่ยนสีหรือยกขึ้นเล็กน้อย)

### ส่วนที่ 5 — คำถามคิด (ตอบใน `NOTES.md`)

1. ทำไม `<div class="header">` จึงแย่กว่า `<header>` สำหรับ accessibility?
2. เมื่อไหร่ควรใช้ Flexbox แทน Grid สำหรับ navbar?
3. `minmax(160px, 1fr)` กับ `auto-fit` ช่วยลด media query ได้อย่างไร?

---

## เกณฑ์ผ่าน

- [ ] Landmark ครบและมี skip link ที่โฟกัสแล้วเห็นได้
- [ ] ไม่มีสี hardcode นอก `:root` (ยกเว้นค่าโปร่งใสของ shadow ถ้าจำเป็น)
- [ ] Desktop 2 column / Mobile 1 column
- [ ] การ์ดหนังสือ responsive ด้วย auto-fit
- [ ] เคารพ `prefers-reduced-motion`
- [ ] มี `NOTES.md` ตอบคำถามคิด

---

## เฉลย

ดูโค้ดเต็มใน [`lab/solution/`](./lab/solution/)

วิธีเปิด:

```bash
# จากราก bootcamp
npx --yes serve 01-beginner/lab/solution
# แล้วเปิด URL ที่แสดงในเทอร์มินัล
```
