# NOTES — Harbor Console Lab

## ส่วนที่ 4 — Performance / SSR

### ทำไม `useEffect` สลับ dark mode ถึงพัง?

SSR (หรือ HTML แรกจาก Vite/host) ส่ง markup ตามธีมเริ่มต้น (เช่น light)
จากนั้น client hydrate แล้วยังเป็น light อยู่ — **ตรงกัน**
พอ `useEffect` อ่าน `localStorage` แล้วสลับเป็น dark หลัง paint ผู้ใช้เห็น **flash**
และถ้ามีโค้ดที่ render คนละอย่างระหว่าง server/client (เช่น `const dark = window...` ใน body ของ component) จะได้ **hydration mismatch**

ทางแก้ในเฉลย: ใส่ **inline script ใน `<head>`** ตั้ง `data-color-scheme` ก่อน paint
ใน Next.js จริง ๆ นิยมอ่าน cookie ฝั่ง server หรือใช้ `beforeInteractive` script

### Anti-flash strategy (สรุป)

1. Cookie ที่ server อ่านได้ → render theme ถูกตั้งแต่วันแรก (ดีสุดสำหรับ SSR)
2. Inline script ก่อน paint สำหรับ SPA / static
3. หลีกเลี่ยงการให้ `useEffect` เป็นแหล่งความจริงของ theme แรก

### SSR checklist (MUI / Next)

1. ใช้ App Router cache provider ตามเอกสาร MUI
2. Theme object เสถียรระหว่าง server และ client
3. `CssBaseline` ภายใต้ `ThemeProvider`
4. อย่าสุ่ม emotion id คนละแบบ
5. ทดสอบด้วย production build

## ส่วนที่ 5 — คำถามคิด

### 1. เมื่อไหร่ `styleOverrides` ดีกว่า `styled(Button)` ทุกครั้ง?

เมื่อเป็น **นโยบายทั้งผลิตภัณฑ์** (เช่น เลิกใช้ uppercase, elevation ปิดเป็น default)
`styleOverrides` ทำให้ทุก `<Button>` ได้พฤติกรรมเดียวกันโดยไม่ต้องจำห่อ
ส่วน `styled(Button)` เหมาะกับ primitive เฉพาะทางที่มี API/ชื่อธุรกิจชัด (เช่น `DangerButton`)

### 2. ทำไม `helperText=" "` ช่วย CLS?

เมื่อไม่มี error ความสูงของแถว helper เป็นศูนย์หรือหายไป
พอมี error ข้อความแทรกแล้วดัน form ลง — เกิด layout shift
การจองบรรทัดว่างไว้ตลอดทำให้ความสูงคงที่

### 3. Path import กับ tree shaking

การ import แบบ `import Button from "@mui/material/Button"` ช่วยให้ bundler
ดึงเฉพาะ module ที่ใช้ได้ชัดเจนกว่าในบาง setup
**ต้องยืนยันด้วย bundle analyzer** (เช่น `rollup-plugin-visualizer`, Vite plugin)
เพราะผลลัพธ์ขึ้นกับ version package exports และ config ของ bundler — อย่าเดาจากความรู้สึก

## สิ่งที่แก้จากบั๊ก QA

- Brand สีอยู่ใน theme เท่านั้น — Chip ใช้ `palette` semantic colors
- ตารางมี `minHeight` + Skeleton
- form จอง helper text
- Anti-flash script ใน `index.html` + `HarborThemeProvider` สลับ MUI palette จริง
- หัวข้อใช้ `clamp()` ใน `typography.h4`
