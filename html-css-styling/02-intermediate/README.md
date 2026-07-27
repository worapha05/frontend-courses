# Level 2 — Intermediate: CSS at Scale & Utility-First Revolution

ระดับนี้ยกระดับจาก “จัดหน้าได้” เป็น **จัดระบบสไตล์ให้ทีมใหญ่ใช้ร่วมกันได้**
ครอบคลุม **SASS/LESS (7-1 Pattern)** และ **Tailwind CSS (Utility-First + Component Composition)**

---

## สารบัญ

1. [ทำไม CSS ถึงพังเมื่อ project โต](#1-ทำไม-css-ถึงพังเมื่อ project โต)
2. [SASS Power Tools & 7-1 Pattern](#2-sass-power-tools--7-1-pattern)
3. [LESS เทียบกับ SASS](#3-less-เทียบกับ-sass)
4. [Tailwind CSS: Utility-First Paradigm](#4-tailwind-css-utility-first-paradigm)
5. [Config, Dark Mode, Arbitrary Values](#5-config-dark-mode-arbitrary-values)
6. [Component Composition ด้วย clsx / tailwind-merge](#6-component-composition)
7. [Design System Thinking ระดับ Intermediate](#7-design-system-thinking)
8. [Best Practices](#8-best-practices)
9. [ตัวอย่างใน folder นี้](#9-ตัวอย่างใน folder นี้)

---

## 1. ทำไม CSS ถึงพังเมื่อ project โต

อาการ classic:

- ไฟล์ `styles.css` เดียวยาวหลายพันบรรทัด
- Specificity war → มีคนเริ่มโปรย `!important`
- ชื่อ class ซ้ำความหมาย (`header`, `header2`, `new-header`)
- ลบ component แล้ว CSS เก่าค้าง (dead code)
- ไม่มี single source of truth สำหรับสี/spacing

ทางแก้มี 2 แนวหลักที่ใช้จริงในอุตสาหกรรม:

| แนวทาง                        | ตัวแทน                  | จุดแข็ง                                                   |
| ----------------------------- | ----------------------- | --------------------------------------------------------- |
| **Preprocessor architecture** | SASS/LESS + 7-1 / ITCSS | โครงสร้างชัด, mixin/reuse, เหมาะกับทีมที่คิดเป็น partials |
| **Utility-first**             | Tailwind                | เร็ว, consistent, purge ได้ดี, ลดตั้งชื่อ class           |

ทั้งสองแนวใช้ **Design Tokens** เป็นหัวใจ — ต่างกันที่ชั้นที่ developer เขียนวันต่อวัน

---

## 2. SASS Power Tools & 7-1 Pattern

### SASS คืออะไร?

SASS (Syntactically Awesome Style Sheets) compile เป็น CSS
นิยมใช้ **SCSS syntax** ที่คล้าย CSS ปกติ:

```scss
$color-accent: #0f766e;

.button {
  background: $color-accent;

  &:hover {
    filter: brightness(1.05);
  }
}
```

### feature สำคัญ

#### Variables

```scss
$space-4: 1rem;
$radius-md: 8px;
```

ต่างจาก CSS variables: ค่า SASS หายไปหลัง compile (ใช้ตอน build)
มักเก็บ **token ระดับ build** แล้วส่งออกเป็น CSS variables สำหรับ runtime/theme

#### Nesting

```scss
.card {
  padding: $space-4;

  &__title {
    font-weight: 700;
  }
  &--featured {
    border-color: $color-accent;
  }

  &:focus-within {
    outline: 2px solid $color-accent;
  }
}
```

อย่า nest ลึกเกิน 3 ชั้น — จะได้ selector ที่เปราะและ specificity สูง

#### Mixins

```scss
@mixin focus-ring($color: $color-accent) {
  &:focus-visible {
    outline: 2px solid $color;
    outline-offset: 2px;
  }
}

.button {
  @include focus-ring;
}
```

#### Functions

```scss
@use 'sass:color';

@function fade-ink($alpha) {
  @return rgb(28 25 23 / $alpha);
}
```

#### `@extend` — ใช้อย่างระวัง

```scss
%button-base {
  display: inline-flex;
  font-weight: 600;
}

.button-primary {
  @extend %button-base;
  background: blue;
}
```

`@extend` รวม selector เข้าด้วยกัน อาจสร้าง CSS ที่อ่านยาก — หลายทีมชอบ **mixin** มากกว่าสำหรับ reuse

### โครงสร้าง 7-1 Pattern

แยก SCSS เป็น 7 folder + 1 ไฟล์หลัก `main.scss`:

```
scss/
├── abstracts/ # variables, functions, mixins, placeholders (ไม่ output CSS ตรง ๆ)
├── base/  # reset, typography, base element styles
├── components/ # buttons, cards, forms...
├── layout/ # header, grid, footer...
├── pages/  # styles เฉพาะหน้า (home, checkout...)
├── themes/ # light/dark หรือ brand variants
├── vendors/ # third-party overrides
└── main.scss # @use ทุกชั้นตามลำดับ
```

ลำดับใน `main.scss` สำคัญ — โหลด abstracts ก่อน แล้วค่อย base → layout → components → pages

```scss
@use 'abstracts/variables';
@use 'abstracts/mixins';
@use 'base/reset';
@use 'base/typography';
@use 'layout/header';
@use 'components/button';
@use 'themes/dark';
```

> หมายเหตุยุคใหม่: ใช้ `@use` / `@forward` แทน `@import` ที่ถูก deprecate

---

## 3. LESS เทียบกับ SASS

LESS มีแนวคิดคล้ายกัน (variables, nesting, mixins) แต่ syntax ต่าง:

```less
@accent: #0f766e;

.button {
  background: @accent;
  .rounded(8px);
}

.rounded(@radius) {
  border-radius: @radius;
}
```

| หัวข้อ             | SASS (SCSS)             | LESS                              |
| ------------------ | ----------------------- | --------------------------------- |
| ตัวแปร             | `$name`                 | `@name`                           |
| Module system      | `@use` / `@forward`     | ข้อจำกัดกว่า / แบบ classic import |
| Ecosystem ปัจจุบัน | ใหญ่กว่าใน project ใหม่ | ยังเจอใน project เก่า             |
| Compile            | Dart Sass               | lessc                             |

เรียนรู้แนวคิดจาก SASS แล้วย้ายไป LESS ได้ไม่ยาก — Lab ระดับนี้โฟกัส SASS เป็นหลัก และมีตัวอย่าง LESS สั้น ๆ

---

## 4. Tailwind CSS: Utility-First Paradigm

แทนที่จะเขียน:

```css
.card {
  padding: 1rem;
  border-radius: 8px;
  background: white;
}
```

คุณประกอบ utilities ใน markup:

```html
<div class="rounded-lg bg-white p-4 shadow-sm">...</div>
```

### ข้อดี

- ลดการตั้งชื่อ class ที่ไม่มีความหมาย
- Design constraints อยู่ใน config (spacing scale, colors)
- Purge/content scanning ตัด CSS ที่ไม่ใช้ตอน build
- ทีมใหม่ onboard เร็วถ้ามี convention

### ข้อเสียที่ต้องจัดการ

- class string ยาว อ่านยาก → แก้ด้วย component abstraction
- ออกแบบ “นอกระบบ” ด้วย arbitrary values มากเกินไป → แตก scale
- บางทีมไม่ชอบ logic อยู่ใน class attribute

---

## 5. Config, Dark Mode, Arbitrary Values

### `tailwind.config.js` แกนหลัก

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // หรือ 'media'
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          600: '#0d9488',
          900: '#134e4a',
        },
      },
      screens: {
        xs: '480px',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### Dark Mode แบบ dynamic (`class`)

```html
<html class="dark">
  <body class="bg-white text-stone-900 dark:bg-stone-950 dark:text-stone-50"></body>
</html>
```

สลับด้วย JS: `document.documentElement.classList.toggle('dark')`

### Arbitrary values

```html
<div class="top-[17px] bg-[#1a1a1a] w-[clamp(16rem,40vw,28rem)]"></div>
```

ใช้เมื่อจำเป็น — ถ้าค่าเดิมซ้ำ ให้ย้ายเข้า `theme.extend` แทน

---

## 6. Component Composition

ปัญหา: ปุ่มซ้ำทุกหน้า แต่ class ยาวและมีเงื่อนไข variant

```tsx
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Array<string | false | null | undefined>) {
  return twMerge(clsx(inputs));
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md';
};

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-semibold transition',
        variant === 'primary' && 'bg-brand-600 text-white hover:bg-brand-900',
        variant === 'ghost' && 'bg-transparent text-brand-900 ring-1 ring-brand-600',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2',
        className,
      )}
      {...props}
    />
  );
}
```

- **`clsx`** — รวมเงื่อนไข class
- **`tailwind-merge`** — ยุบ utilities ที่ชนกัน (`px-2` กับ `px-4` → เหลืออันหลัง)

สร้าง Input / Modal ด้วยแนวเดียวกัน → ได้ design system เบา ๆ โดยไม่ต้องมี CSS แยกไฟล์

---

## 7. Design System Thinking

ระดับ Intermediate คุณควรแยกชั้นความคิด:

```
Tokens (สี, spacing, type)
 ↓
Primitives (Button, Input, Heading)
 ↓
Patterns (Form field, Modal, Card)
 ↓
Pages / Features
```

ไม่ว่าจะใช้ SASS หรือ Tailwind ให้ถามเสมอ:

1. ค่านี้เป็น token หรือ one-off?
2. component นี้ reuse ได้จริง หรือแค่ copy?
3. variant มีกี่แบบ — ถ้าเกิน 5 แบบ อาจออกแบบเกิน?

---

## 8. Best Practices

1. SASS: ใช้ `@use` และจำกัด nesting ≤ 3 ชั้น
2. เก็บ token ใน abstracts แล้ว map ไป CSS variables ถ้าต้องการ runtime theme
3. หลีกเลี่ยง `@extend` กว้าง ๆ — ชอบ mixin / placeholder เฉพาะจุด
4. Tailwind: ใส่ `content` paths ให้ครบ ไม่งั้น class จะถูก purge
5. Dark mode เลือก `class` เมื่อต้องการ toggle ในแอป
6. Abstract utilities ที่ซ้ำเป็น component ด้วย `cn()`
7. อย่าผสม utility กับ CSS เฉพาะกิจแบบไร้กฎ — กำหนด convention ของทีม
8. Review bundle CSS หลัง build เป็นประจำ

---

## 9. ตัวอย่างใน folder นี้

| folder                                                                   | เนื้อหา                         |
| ------------------------------------------------------------------------ | ------------------------------- |
| [`examples/01-sass-71-pattern/`](./examples/01-sass-71-pattern/)         | โครง 7-1 + button/card mixins   |
| [`examples/02-less-basics/`](./examples/02-less-basics/)                 | Variables / mixins ฝั่ง LESS    |
| [`examples/03-tailwind-config/`](./examples/03-tailwind-config/)         | `tailwind.config.js`, dark mode |
| [`examples/04-tailwind-components/`](./examples/04-tailwind-components/) | Button, Input, Modal + `cn()`   |

ถัดไป: [`LAB.md`](./LAB.md) — สร้าง Mini Design System ด้วย SASS + Tailwind components

---

## Checklist ก่อนขึ้น Expert

- [ ] อธิบาย 7 folder ใน 7-1 ได้
- [ ] เขียน mixin สำหรับ focus ring และ respond-to breakpoint ได้
- [ ] ตั้งค่า `theme.extend` และ dark mode แบบ `class`
- [ ] สร้าง Button ที่มี variant โดยไม่ซ้ำ class string
- [ ] อธิบายทำไมต้องใช้ `tailwind-merge` คู่กับ `clsx`
