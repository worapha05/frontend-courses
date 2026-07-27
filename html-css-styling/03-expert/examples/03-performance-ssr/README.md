# Performance & SSR Notes

folder นี้เป็น **checklist + ตัวอย่างโค้ดอ้างอิง** สำหรับงาน production
ไม่จำเป็นต้องรัน Next.js จริงใน lab นี้ แต่โค้ดสะท้อน pattern ที่ใช้กับ App Router + MUI

## 1. Fluid Typography

ดู `src/fluid.css` — ใช้ `clamp()` เป็น type scale

## 2. CSS Purging / Tree Shaking

| เครื่องมือ | วิธี                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------ |
| Tailwind   | ตรวจ `content` paths ให้ครบทุกที่ที่เขียน class                                                  |
| MUI        | ใช้ path import ที่ bundler tree-shake ได้ และวัดด้วย `rollup-plugin-visualizer` / Vite analyzer |
| SASS ดิบ   | PurgeCSS ระวัง dynamic class names                                                               |

## 3. ลด CSS-in-JS cost

- อย่าสร้าง `styled(...)` ภายใน function render
- ยก style object ที่คงที่ออกนอก component
- ใช้ theme overrides สำหรับของที่ใช้ทั้งแอป

## 4. SSR Hydration Checklist (Next.js + MUI)

1. หุ้มแอปด้วย cache/registry ตามเอกสาร MUI สำหรับ App Router
2. Server และ Client ใช้ **theme object ชุดเดียวกัน**
3. อย่าอ่าน `localStorage` เพื่อเลือก dark mode ใน render แรกโดยไม่มีค่าจาก server
4. รูป/ไอคอนที่ขึ้นกับ client ต้องมี placeholder ขนาดคงที่
5. ทดสอบด้วย `next build && next start` — ไม่ใช่แค่ `next dev`

ตัวอย่างโครงสร้างแนวคิดอยู่ใน `src/ssr-theme-registry.tsx` และ `src/no-flash-dark-mode.tsx`
