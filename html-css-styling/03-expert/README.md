# Level 3 — Expert: Enterprise Component Design Systems & Optimization

ระดับ Expert รวมทุกอย่างเป็น **Design System ระดับองค์กร** ด้วย Material UI (MUI)
พร้อม **รูปแบบปฏิสัมพันธ์ซับซ้อน** และ **วิศวกรรม UI สำหรับ production / SSR**

---

## สารบัญ

1. [จาก Tokens สู่ Enterprise Design System](#1-จาก-tokens-สู่-enterprise-design-system)
2. [MUI Architecture: Theme & Overrides](#2-mui-architecture-theme--overrides)
3. [`sx` vs `styled` — เลือกอย่างไร](#3-sx-vs-styled)
4. [Advanced Patterns: Data Grid & Forms](#4-advanced-patterns-data-grid--forms)
5. [ลด Layout Shift (CLS)](#5-ลด-layout-shift-cls)
6. [Production UI Engineering](#6-production-ui-engineering)
7. [SSR & Style Hydration](#7-ssr--style-hydration)
8. [Best Practices](#8-best-practices)
9. [ตัวอย่างใน folder นี้](#9-ตัวอย่างใน folder นี้)

---

## 1. จาก Tokens สู่ Enterprise Design System

Design System ที่สเกลได้ไม่ใช่แค่ชุดปุ่มสวย ๆ แต่เป็นสัญญาของทีม:

```
Brand decisions
 → Design Tokens (สี, type, space, elevation, motion)
 → Theme object (MUI createTheme / Tailwind theme)
 → Primitives (Button, TextField, Dialog)
 → Patterns (DataGrid toolbar, Filterable form)
  → Products (Admin, Checkout, Marketing)
```

ใน MUI ชั้น Theme คือสะพานระหว่าง tokens กับ components:

- เปลี่ยน brand ครั้งเดียวที่ `createTheme`
- components ทั้งแอปรับค่าผ่าน `ThemeProvider`
- ทีมผลิตภัณฑ์ไม่ hardcode hex ในหน้า feature

---

## 2. MUI Architecture: Theme & Overrides

### createTheme + ThemeProvider

```tsx
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0f766e', contrastText: '#ecfdf5' },
    secondary: { main: '#b45309' },
    background: { default: '#f6f4ef', paper: '#ffffff' },
  },
  typography: {
    fontFamily: '"Source Sans 3", "Sarabun", system-ui, sans-serif',
    h1: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 700 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 700 },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundImage: 'radial-gradient(circle at top, #ccfbf155, transparent 40%)' },
      },
    },
  },
});

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
```

### Global component overrides

อยู่ใน `theme.components.<MuiX>.styleOverrides` / `variants` / `defaultProps`
ใช้เมื่อต้องการมาตรฐานทั้งแอป เช่น ปุ่มไม่มี uppercase, TextField ขนาดมาตรฐาน

### Responsive ใน theme

```ts
typography: {
 h1: {
 fontSize: "2rem",
 [createTheme().breakpoints.up("md")]: { fontSize: "2.75rem" },
 },
}
```

หรือใช้ `theme.breakpoints` ภายใน `sx` / `styled`

---

## 3. `sx` vs `styled`

| แนวทาง              | เหมาะกับ                                | ข้อควรระวัง                            |
| ------------------- | --------------------------------------- | -------------------------------------- |
| **`sx` prop**       | one-off / ใกล้ markup, prototype เร็ว   | อย่าใส่ logic ยาวมากในทุกจุด — อ่านยาก |
| **`styled()`**      | component ที่มี API ชัด, reuse ข้ามหน้า | อย่าสร้าง styled ซ้ำโดยไม่จำเป็น       |
| **Theme overrides** | นโยบายทั้งแอป                           | กระทบกว้าง — ต้องมี review             |

```tsx
// sx — รวดเร็ว ตาม theme tokens
<Box sx={{ p: 2, display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }} />;

// styled — เป็น component ในระบบ
const Toolbar = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));
```

กฎง่าย ๆ: **ถ้าใช้ซ้ำ ≥ 3 ครั้ง หรือมีชื่อทางธุรกิจ → ยกเป็น styled/component**

---

## 4. Advanced Patterns: Data Grid & Forms

### Data Grid ที่ลื่น

ความท้าทายไม่ใช่แค่ตาราง แต่เป็น:

- virtualization เมื่อแถวเยอะ
- column resize / sort / filter โดยไม่กระตุก
- skeleton / placeholder ความสูงคงที่เพื่อลด CLS
- toolbar + empty state + error state

แนวทาง:

1. กำหนด `minHeight` ของตารางล่วงหน้า
2. ใช้ skeleton ที่สูงเท่าแถวจริง
3. แยก cell renderer ที่หนักออก และ memo เมื่อจำเป็นตามแนวทางทีม
4. อย่าใส่ animation เปลี่ยนความสูงแถวแบบกระทันหัน

### Forms + validation styling

```tsx
<TextField
  error={Boolean(errors.email)}
  helperText={errors.email?.message ?? ' '}
  // helperText เป็นช่องว่างคงที่ → ลดการกระโดดเมื่อมี/ไม่มี error
/>
```

เทคนิคสำคัญ:

- จองที่สำหรับ helper text เสมอ (หรือใช้ min-height)
- สี error มาจาก `palette.error` ไม่ hardcode
- ผูก `aria-describedby` / `id` ของ helper ให้ AT อ่านได้ (MUI ทำส่วนใหญ่ให้ ถ้าใช้ TextField ถูกวิธี)

---

## 5. ลด Layout Shift (CLS)

สาเหตุ UI ที่พบบ่อย:

- ฟอนต์เว็บโหลดช้าแล้วสลับ metric
- รูปไม่มี width/height
- banner / alert แทรกด้านบนหลัง fetch
- ตารางเรนเดอร์จากว่าง → เต็มโดยไม่จองที่

แนวทาง:

- `font-display: swap` + เลือก fallback metric ใกล้เคียง / `size-adjust`
- จอง aspect-ratio ให้สื่อ
- สำรองความสูง skeleton
- หลีกเลี่ยงแทรกเนื้อหาเหนือ fold หลัง hydrate โดยไม่คาดการณ์

Fluid Typography ช่วยลด “กระโดด” ระหว่าง breakpoint:

```css
:root {
  --step-0: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --step-1: clamp(1.25rem, 1.1rem + 0.6vw, 1.75rem);
}
```

ใน MUI อาจ map เข้า `typography` หรือใช้ `sx={{ fontSize: "clamp(...)" }}`

---

## 6. Production UI Engineering

### CSS Purging

- **Tailwind:** สแกน `content` paths ตัด class ที่ไม่ถูกอ้าง
- **SASS/CSS ดิบ:** ใช้ PurgeCSS / Lightning CSS อย่างระวังกับชื่อ class ที่ประกอบจากตัวแปร

### Tree Shaking UI libraries

```ts
// ดี — import รายตัว (รองรับ tree-shake ตาม bundler/package exports)
import Button from '@mui/material/Button';

// หลีกเลี่ยงในบาง setup เก่า
import { Button } from '@mui/material'; // ตรวจ bundle จริงด้วย analyzer
```

ใช้ path import ตามเอกสาร version ที่ทีมใช้ และวัดด้วย Rollup/Vite/Webpack analyzer

### CSS-in-JS optimization

- Emotion/MUI: ลดการสร้าง `styled` ภายใน render
- ยก theme และ style objects ที่นิ่งออกนอก component
- ใน Next.js App Router ใช้แนวทางที่ MUI แนะนำสำหรับ RSC/SSR ของ version นั้น

---

## 7. SSR & Style Hydration

ปัญหา classic: HTML จาก server กับ CSS ที่เจนฝั่ง client **ไม่ตรงกัน** → กระพริบ / warning hydration

สาเหตุที่พบบ่อยกับ MUI / Emotion / styled-components:

1. ไม่รวบรวม critical CSS ตอน SSR
2. Random class id คนละ seed ระหว่าง server/client
3. `typeof window` แยก style คนละทาง
4. Dark mode อ่าน `localStorage` ตอน hydrate ทำให้ class บน `<html>` เปลี่ยนหลัง paint

แนวทาง (Next.js + MUI โดยสรุป):

- ใช้ App Router cache / registry ตามเอกสาร MUI ปัจจุบัน (`AppRouterCacheProvider` ฯลฯ)
- ให้ server และ client ใช้ theme เดียวกัน
- ทำ dark mode ด้วย cookie / class ที่ server รู้ก่อน render หรือยอม flash อย่างมีแผน
- อย่า render markup ที่พึ่งค่า client-only ใน SSR โดยไม่มี placeholder ที่สูงเท่ากัน

สำหรับ Nuxt / Vue ecosystem หลักการเดียวกัน: **critical CSS in SSR payload + consistent class generation**

---

## 8. Best Practices

1. Tokens → Theme → Components — ห้ามข้ามชั้นโดย hardcode ทั่วแอป
2. Global overrides สำหรับนโยบาย, `sx` สำหรับจุดเดียว, `styled` สำหรับ reuse
3. จองที่ให้ skeleton / helper text / media เพื่อ CLS
4. วัด bundle ของ UI library เป็นประจำ
5. ทดสอบ SSR hydrate ในโหมด production build ไม่ใช่แค่ dev
6. เคารพ `prefers-reduced-motion` ใน motion ของ DS
7. เอกสาร variants ของแต่ละ primitive ให้ทีมออกแบบและวิศวกรอ่านชุดเดียวกัน
8. เปลี่ยน theme ต้องมี visual regression อย่างน้อยหน้าหลัก ๆ

---

## 9. ตัวอย่างใน folder นี้

| folder                                                           | เนื้อหา                                          |
| ---------------------------------------------------------------- | ------------------------------------------------ |
| [`examples/01-mui-theme/`](./examples/01-mui-theme/)             | `createTheme`, overrides, `sx` vs `styled`       |
| [`examples/02-data-grid-forms/`](./examples/02-data-grid-forms/) | ตาราง + form validation ลด CLS                   |
| [`examples/03-performance-ssr/`](./examples/03-performance-ssr/) | Fluid type, purge notes, SSR hydration checklist |

ถัดไป: [`LAB.md`](./LAB.md) — สร้าง Admin Design System จำลองพร้อมแก้ hydration / CLS

---

## Checklist จบหลักสูตร

- [ ] สร้าง MUI theme ที่สะท้อน brand tokens ได้
- [ ] อธิบาย trade-off ของ `sx` / `styled` / theme overrides
- [ ] สร้าง form ที่ error ไม่ทำให้เลย์เอาต์กระโดด
- [ ] อธิบายวิธีลด CLS ในตารางและฟอนต์
- [ ] อธิบายสาเหตุ hydration mismatch ของ CSS-in-JS และวิธีกัน
