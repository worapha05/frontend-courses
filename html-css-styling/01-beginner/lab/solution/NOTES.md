# NOTES — Nori Press Lab

## คำตอบส่วนที่ 5

### 1. ทำไม `<div class="header">` จึงแย่กว่า `<header>`?

`<div>` ไม่มีความหมายเชิงโครงสร้าง — screen reader จะไม่ประกาศเป็น banner landmark
อัตโนมัติ ผู้ใช้ที่นำทางด้วย landmarks จึงข้ามไปส่วนหัวไม่ได้สะดวก
นอกจากนี้เครื่องมือ SEO และ outline tools ก็อ่าน intent ของหน้าได้น้อยลง
ถ้าจำเป็นต้องใช้ `div` จริง ๆ ต้องใส่ `role="banner"` เอง และดูแล keyboard ด้วย —
ซึ่งซ้ำซ้อนและพลาดง่ายกว่าการใช้แท็ก semantic

### 2. เมื่อไหร่ควรใช้ Flexbox แทน Grid สำหรับ navbar?

Navbar ส่วนใหญ่เป็น **การจัดเรียง 1 มิติ** (ซ้าย–ขวา หรือ บน–ล่างบนมือถือ)
Flexbox เหมาะกว่าเพราะ API ตรงกับงาน: `justify-content`, `align-items`, `gap`, `wrap`
Grid ยังใช้ได้ แต่จะ “เกินงาน” ถ้าไม่มีแถว/column ซ้อนซับซ้อน
สรุป: แถบนำทางแนวนอน → Flex; โครงหน้าทั้งเอกสารหลายโซน → Grid

### 3. `minmax(160px, 1fr)` กับ `auto-fit` ช่วยลด media query อย่างไร?

`repeat(auto-fit, minmax(160px, 1fr))` ให้ browser คำนวณจำนวน column เอง:
ถ้าความกว้าง container เหลือพอสำหรับอีก 160px จะเพิ่ม column
ถ้าแคบลง column จะยุบเหลือน้อยลงและแต่ละ column ยืดเป็น `1fr`
จึงได้พฤติกรรม responsive โดยไม่ต้องเขียน `@media` แยกทุก breakpoint สำหรับกรณีการ์ดทั่วไป

## สิ่งที่แก้จากสถานการณ์พัง

- ใส่ `box-sizing: border-box` ทั้งเอกสาร
- `flex-wrap` บน navbar และ CTA
- การ์ดใช้ `flex-direction: column` + `margin-top: auto` ที่ link
- ปิด transition เมื่อ `prefers-reduced-motion: reduce`
