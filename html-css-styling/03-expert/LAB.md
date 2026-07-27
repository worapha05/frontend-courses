# Lab ระดับ Expert — Admin DS “Harbor Console”

## เป้าหมาย

สร้าง **Admin Design System จำลอง** สำหรับผลิตภัณฑ์ **Harbor Console** ที่ประกอบด้วย:

1. MUI `createTheme` + `ThemeProvider` + global overrides
2. หน้าที่มี Data table + form validation styling ที่ลด CLS
3. ใช้ทั้ง `sx` และ `styled` อย่างจงใจ
4. ผ่าน checklist ด้าน performance / SSR hydration (ตอบใน NOTES และใส่โค้ดอ้างอิง)

ทำด้วยตัวเองก่อน แล้วค่อยเทียบ [`lab/solution/`](./lab/solution/)

---

## กรณีศึกษา

ทีม Harbor กำลัง migrate admin จาก CSS กระจัดกระจายมาใช้ MUI
QA รายงานปัญหา production:

| บั๊ก                         | รายละเอียด                                                    |
| ---------------------------- | ------------------------------------------------------------- |
| **FOUC / hydration warning** | ธีมมืดกระพริบหลังโหลด เพราะอ่าน `localStorage` ใน `useEffect` |
| **CLS 0.28**                 | ตารางโหลดแล้วสูงพุ่ง, form กระโดดเมื่อโชว์ error              |
| **Bundle โต**                | import ทั้ง `@mui/material` แบบ barrel ในหลายไฟล์โดยไม่ตรวจ   |
| **Brand ไม่คงที่**           | บางหน้า hardcode สี `#0f766e` ใน `sx` แทน palette             |

คุณคือ Principal FE — ต้องส่ง **Harbor Console v1** ที่แก้จุดเหล่านี้

---

## โจทย์

### ส่วนที่ 1 — Theme Package

สร้าง `src/theme/harborTheme.ts`:

- `palette.primary.main = #0f766e`
- `typography.button.textTransform = "none"`
- `shape.borderRadius = 10`
- override `MuiButton` ให้ `disableElevation` เป็น default
- export แล้วหุ้มแอปด้วย `ThemeProvider` + `CssBaseline`

### ส่วนที่ 2 — Primitives ด้วย `styled` + หน้าด้วย `sx`

1. สร้าง `PageHeader` แบบ `styled("header")` มี title + actions slot
2. หน้าหลักใช้ `Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" } }}`

### ส่วนที่ 3 — Orders Table + Invite Form

- ตารางออเดอร์: โหลดจำลอง 800ms พร้อม **Skeleton**, container มี **minHeight คงที่**
- form: ชื่อ + อีเมล validate, `helperText` จองที่ด้วย `" "` เมื่อไม่มี error
- สถานะออเดอร์ใช้ `Chip` จาก `palette` (success/warning/error) — ห้าม hex ตรง ๆ

### ส่วนที่ 4 — Performance / SSR (สถานการณ์พัง)

ทำครบทุกข้อ:

1. เขียน `NOTES.md` อธิบายทำไม `useEffect` สลับ dark mode เกิด hydration mismatch / flash
2. ใส่ตัวอย่าง `antiFlashScript` หรืออธิบาย cookie strategy
3. ระบุอย่างน้อย 3 ข้อใน checklist SSR ของ MUI/Next
4. ใช้ fluid font อย่างน้อยที่หัวข้อหน้า (`clamp` ใน theme หรือ sx)

### ส่วนที่ 5 — คำถามคิด

1. เมื่อไหร่ theme `styleOverrides` ดีกว่าการห่อ `styled(Button)` ทุกครั้ง?
2. ทำไม `helperText=" "` ถึงช่วย CLS?
3. Path import ของ MUI ช่วย tree shaking อย่างไร — และควรยืนยันด้วยเครื่องมืออะไร?

---

## เกณฑ์ผ่าน

- [ ] Theme ทำงานทั้งหน้า โดยปุ่มไม่มี uppercase
- [ ] Layout 2 column บนจอใหญ่ / 1 column บนมือถือ
- [ ] ตารางมี skeleton + minHeight
- [ ] form error ไม่ทำให้เลย์เอาต์กระโดดแรง
- [ ] ไม่มี hex brand กระจัดกระจายนอก theme (ยกเว้นในไฟล์ theme เอง)
- [ ] NOTES ครบคำถาม + SSR checklist

---

## เฉลย

ดู [`lab/solution/`](./lab/solution/)

```bash
cd 03-expert/lab/solution
npm install
npm run dev
```
