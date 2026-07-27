# Level 1 — Beginner: Semantic Web & Core Layout Engines

ทฤษฎีพื้นฐานของเว็บสมัยใหม่: **HTML5 Semantics**, **CSS Architecture**, และ **Layout Engines (Flexbox + Grid)**
เป้าหมายคือให้คุณควบคุมหน้าจอได้อย่างแม่นยำ โดยไม่ต้องพึ่ง framework

---

## สารบัญ

1. [HTML5 Architecture & Semantics](#1-html5-architecture--semantics)
2. [CSS Foundations: Box Model, Cascade, Specificity](#2-css-foundations)
3. [CSS Variables & Design Tokens เบื้องต้น](#3-css-variables--design-tokens)
4. [Flexbox เชิงลึก](#4-flexbox-เชิงลึก)
5. [CSS Grid เชิงลึก](#5-css-grid-เชิงลึก)
6. [Responsive Design & Media Queries](#6-responsive-design--media-queries)
7. [Animations & Transitions](#7-animations--transitions)
8. [Best Practices](#8-best-practices)
9. [ตัวอย่างใน folder นี้](#9-ตัวอย่างใน folder นี้)

---

## 1. HTML5 Architecture & Semantics

### ทำไม Semantic Tags สำคัญ?

browser แสดง `<div>` กับ `<header>` ได้เหมือนกันบนจอ — แต่ **ความหมาย** ต่างกันมาก:

| แท็ก        | บทบาท                         | ประโยชน์                      |
| ----------- | ----------------------------- | ----------------------------- |
| `<header>`  | ส่วนหัวของหน้าหรือ section    | Landmark สำหรับ screen reader |
| `<nav>`     | กลุ่ม link นำทางหลัก          | SEO + skip navigation         |
| `<main>`    | เนื้อหาหลัก (มีได้ 1 ต่อหน้า) | ช่วย AT ข้ามไปเนื้อหาเร็ว     |
| `<article>` | เนื้อหาที่แชร์/standalone ได้ | เหมาะ blog post, card ข่าว    |
| `<section>` | กลุ่มเนื้อหาตามหัวข้อ         | ต้องมี heading ที่เกี่ยวข้อง  |
| `<aside>`   | เนื้อหาข้างเคียง / sidebar    | complementary landmark        |
| `<footer>`  | ส่วนท้ายของหน้าหรือ section   | ข้อมูลติดต่อ, copyright       |

### Document Outline ที่ดี

```html
<body>
  <a class="skip-link" href="#main">ข้ามไปเนื้อหาหลัก</a>
  <header>
    <p class="brand">Brand</p>
    <nav aria-label="หลัก">...</nav>
  </header>
  <main id="main">
    <article>
      <h1>...</h1>
      <section aria-labelledby="sec-1">...</section>
    </article>
    <aside aria-label="เกี่ยวข้อง">...</aside>
  </main>
  <footer>...</footer>
</body>
```

### ARIA เมื่อจำเป็น — ไม่ใช่ทดแทน HTML

กฎ **First Rule of ARIA**: ถ้ามี HTML element ที่สื่อความหมายอยู่แล้ว ให้ใช้มันก่อน

```html
<!-- ดี -->
<button type="button">บันทึก</button>

<!-- แย่ — ต้องทำ keyboard + role เองทั้งหมด -->
<div role="button" tabindex="0">บันทึก</div>
```

ARIA ที่ใช้บ่อยอย่างถูกต้อง:

- `aria-label` / `aria-labelledby` — ตั้งชื่อ landmark หรือปุ่มที่ไม่มีข้อความ
- `aria-expanded` — เปิด/ปิดเมนู
- `aria-current="page"` — หน้าปัจจุบันใน nav
- `aria-hidden="true"` — ซ่อนไอคอนตกแต่งจาก AT

---

## 2. CSS Foundations

### Box Model

ทุก element คือกล่อง:

```
+---------------------------+
| margin  |
| +---------------------+ |
| | border  | |
| | +---------------+ | |
| | | padding | | |
| | | +---------+ | | |
| | | | content | | | |
| | | +---------+ | | |
| | +---------------+ | |
| +---------------------+ |
+---------------------------+
```

- **`content-box` (default):** `width` = เฉพาะ content → รวม padding/border แล้วกล่องใหญ่กว่าที่คิด
- **`border-box`:** `width` รวม padding + border → ทำนายขนาดง่ายกว่า

Best practice สากล:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

### Cascade (ลำดับการชนะ)

เมื่อหลาย rule ชนกัน browser เรียงตาม:

1. **Origin & Importance** — user `!important` > author `!important` > author normal > user agent
2. **Specificity**
3. **Source order** — อันที่มาก่อนทับ (ถ้า specificity เท่ากัน)

### Specificity คะแนนย่อ

| Selector                    | ตัวอย่าง                    | น้ำหนักโดยประมาณ |
| --------------------------- | --------------------------- | ---------------- |
| Inline style                | `style="..."`               | 1,0,0,0          |
| ID                          | `#hero`                     | 0,1,0,0          |
| Class / attr / pseudo-class | `.card`, `[type]`, `:hover` | 0,0,1,0          |
| Element / pseudo-element    | `div`, `::before`           | 0,0,0,1          |

```css
/* specificity ต่ำ — ปรับง่าย */
.card {
}
.card.is-featured {
} /* เพิ่ม state ด้วย class */

/* หลีกเลี่ยง */
#sidebar .nav ul li a {
} /* สูงเกินไป และผูกกับโครงสร้าง HTML */
```

> **อย่าใช้ `!important` เพื่อแก้ specificity war** — ใช้เมื่อ utility layer หรือ override ของ third-party จริง ๆ

---

## 3. CSS Variables & Design Tokens

CSS Custom Properties คือรากฐานของ Design System ยุคใหม่:

```css
:root {
  --color-bg: #f7f5f0;
  --color-text: #1a1a1a;
  --color-accent: #0f6b5c;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --radius-md: 8px;
  --font-sans: 'Source Sans 3', system-ui, sans-serif;
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.08);
}

.button {
  background: var(--color-accent);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
}
```

ข้อดี:

- เปลี่ยน theme ได้ที่จุดเดียว (รวม dark mode)
- Inherit ตาม DOM tree — override ใน scope ได้
- ใช้ร่วมกับ JS ได้ (`element.style.setProperty`)

---

## 4. Flexbox เชิงลึก

Flexbox เหมาะกับ **การจัดเรียงใน 1 มิติ** (แถวหรือ column)

### Container

```css
.row {
  display: flex;
  flex-direction: row; /* หรือ column */
  flex-wrap: wrap;
  justify-content: space-between; /* แกนหลัก */
  align-items: center; /* แกนขวาง */
  gap: 1rem; /* ช่องว่างสมัยใหม่ */
}
```

### Item

```css
.item {
  flex-grow: 1; /* ขยายเติมที่ว่าง */
  flex-shrink: 1; /* หดเมื่อที่แคบ */
  flex-basis: 200px; /* ขนาดตั้งต้นก่อน grow/shrink */
  /* ย่อ: flex: 1 1 200px; */
  align-self: stretch; /* ยกเลิก align-items รายตัว */
}
```

### รูปแบบที่ใช้บ่อย

| Pattern            | แนวคิด                                                                 |
| ------------------ | ---------------------------------------------------------------------- |
| Navbar             | `justify-content: space-between` + logo / links                        |
| Centering          | `justify-content` + `align-items: center` (หรือ `place-items` บน Grid) |
| Equal-height cards | Flex children ใน row จะสูงเท่ากันโดยธรรมชาติ                           |
| Holy grail sidebar | Flex column บนหน้า + flex row สำหรับ content/sidebar                   |

---

## 5. CSS Grid เชิงลึก

Grid เหมาะกับ **การจัดเรียง 2 มิติ** พร้อมกัน

### Tracks, Lines, Areas

```css
.page {
  display: grid;
  grid-template-columns: 240px 1fr; /* 2 tracks */
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header header'
    'sidebar main'
    'footer footer';
  min-height: 100vh;
  gap: 0;
}

.page > header {
  grid-area: header;
}
.page > aside {
  grid-area: sidebar;
}
.page > main {
  grid-area: main;
}
.page > footer {
  grid-area: footer;
}
```

แนวคิดสำคัญ:

- **Grid Line** — เส้นหมายเลขรอบ track (เริ่มที่ 1)
- **Grid Track** — ช่องระหว่างเส้น (column/row)
- **Grid Cell** — ช่องตัดของ 1 column × 1 แถว
- **Grid Area** — กลุ่ม cell ที่ตั้งชื่อด้วย `grid-template-areas`

### หน่วยที่ใช้บ่อย

| หน่วย                    | ความหมาย                   |
| ------------------------ | -------------------------- |
| `fr`                     | ส่วนของพื้นที่ว่างที่เหลือ |
| `minmax(min, max)`       | จำกัดช่วงขนาด track        |
| `auto-fit` / `auto-fill` | สร้าง column อัตโนมัติ     |
| `repeat(3, 1fr)`         | ซ้ำ pattern                |

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}
```

สูตรนี้คือ **responsive card grid โดยไม่ต้อง media query** สำหรับหลายกรณี

### Flexbox vs Grid — เลือกอย่างไร?

| สถานการณ์                             | เลือก                            |
| ------------------------------------- | -------------------------------- |
| Navbar, ปุ่มกลุ่ม, แถวไอคอน           | Flexbox                          |
| โครงหน้าทั้งหน้า, dashboard, magazine | Grid                             |
| Card ข้างในมีเนื้อหาเรียงแนวตั้ง      | Grid นอก + Flex ใน (หรือกลับกัน) |

---

## 6. Responsive Design & Media Queries

### Mobile-first

```css
.nav-links {
  display: none;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
    gap: 1.5rem;
  }
}
```

Breakpoint ที่นิยม (ปรับตาม project ได้):

| ชื่อ | ความกว้างโดยประมาณ |
| ---- | ------------------ |
| sm   | 640px              |
| md   | 768px              |
| lg   | 1024px             |
| xl   | 1280px             |

นอกจาก `width` ยังมี:

- `prefers-reduced-motion` — ลด animation สำหรับผู้ใช้ที่แพ้การเคลื่อนไหว
- `prefers-color-scheme: dark` — dark mode ระดับ OS
- Container Queries (`@container`) — responsive ตามขนาด parent ไม่ใช่ viewport

---

## 7. Animations & Transitions

### Transition — เปลี่ยนค่าระหว่าง state

```css
.button {
  transition:
    background-color 180ms ease,
    transform 180ms ease;
}
.button:hover {
  background-color: #0c574a;
  transform: translateY(-1px);
}
```

### Animation — ลำดับ keyframes

```css
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fade-up 400ms ease both;
}
```

หลักการที่ดี:

- Animate เฉพาะ `transform` และ `opacity` เมื่อเป็นไปได้ (GPU-friendly)
- เคารพ `prefers-reduced-motion: reduce`
- อย่าใช้ animation เป็นทางแก้ layout ที่พัง

---

## 8. Best Practices

1. **เขียน HTML semantic ให้จบก่อน** แล้วค่อยจัด CSS
2. ใช้ **`border-box` ทั่วทั้งเอกสาร**
3. เก็บสี/ระยะห่างใน **CSS variables**
4. ตั้งชื่อ class ตาม **หน้าที่** (`.card`, `.nav`) ไม่ใช่ตามลักษณะ (`.blue-box`) — หรือใช้ utility อย่างมีระบบถ้าเป็น Tailwind
5. Specificity ต่ำและคงที่ — หลีกเลี่ยง ID ใน CSS selectors
6. Layout สมัยใหม่: **Flex + Grid** ไม่ใช่ table/float
7. ทดสอบ keyboard: Tab ไปทั่วหน้า, โฟกัสมองเห็นได้ชัด
8. ตรวจด้วย DevTools: box model diagram, grid overlay, flex inspector

---

## 9. ตัวอย่างใน folder นี้

| folder                                                                                           | เนื้อหา                          |
| ------------------------------------------------------------------------------------------------ | -------------------------------- |
| [`examples/01-html5-semantics/`](./examples/01-html5-semantics/)                                 | Landmark, skip link, ARIA        |
| [`examples/02-box-model-specificity/`](./examples/02-box-model-specificity/)                     | Box model + specificity war demo |
| [`examples/03-flexbox/`](./examples/03-flexbox/)                                                 | Navbar, centering, equal cards   |
| [`examples/04-css-grid/`](./examples/04-css-grid/)                                               | Grid areas, auto-fit cards       |
| [`examples/05-variables-responsive-animations/`](./examples/05-variables-responsive-animations/) | Tokens, dark mode, motion        |

ถัดไป: ทำ [`LAB.md`](./LAB.md) — สร้างหน้า Landing แบบ semantic ที่ responsive จริง

---

## Checklist ก่อนขึ้น Intermediate

- [ ] อธิบายความต่าง `<section>` กับ `<article>` ได้
- [ ] วาด Box Model และเลือก `border-box` เป็น default ได้
- [ ] สร้าง layout navbar ด้วย Flexbox โดยไม่ใช้ float
- [ ] สร้างโครงหน้าด้วย `grid-template-areas`
- [ ] เขียน card grid ด้วย `auto-fit` + `minmax`
- [ ] ใช้ CSS variables สำหรับสีและ spacing
- [ ] เพิ่ม transition ที่เคารพ `prefers-reduced-motion`
