# NOTES — Harbor UI Lab

## คำตอบส่วนที่ 5

### 1. SASS `$variable` vs CSS `var(--token)`?

- **SASS `$variable`**: ใช้ตอน build สำหรับคำนวณ (functions, mixins, breakpoints ที่ compile แล้วจบ) — ค่าจะถูกแทนที่ใน CSS สุดท้าย ไม่เปลี่ยนตอน runtime
- **CSS `var(--token)`**: ใช้เมื่อต้องการเปลี่ยนตอน runtime (dark mode แบบสลับสด, theming ต่อ tenant, ให้ JS อ่าน/เขียนได้)

แนวทางที่ดี: เก็บแหล่งความจริงเป็น token ชุดเดียว แล้ว **emit เป็น CSS variables** จาก SASS หรือจาก Tailwind theme ถ้าต้องการ runtime theme

### 2. ทำไมต้องมี `tailwind-merge`?

เมื่อ component มี class พื้นฐานเช่น `px-4` และผู้เรียกส่ง `className="px-2"` การต่อ string ธรรมดาจะได้ทั้งสอง class — ตัวที่ชนใน CSS ขึ้นกับลำดับใน stylesheet ไม่ใช่ลำดับใน attribute
`tailwind-merge` รู้กลุ่ม utilities และเหลือเฉพาะค่าหลังสุดที่ชนกัน ทำให้ API แบบ `className` override ทำงานตามที่นักพัฒนาคาดหวัง

### 3. ข้อเสียของ `@apply`?

- ซ่อน utility กลับไปเป็น CSS แบบดั้งเดิม ทำให้เสียข้อดีเรื่องอ่าน constraint จาก markup
- อาจดึง utility ที่ไม่จำเป็นเข้า CSS ถ้าใช้อย่างสะเปะสะปะ
- refactor ยากเมื่อทีมผสม `@apply` กับ class ใน JSX โดยไม่มีกฎ
- ใช้ได้เมื่อสร้าง component class ที่ reuse จริง ๆ (เช่น `.panel`) ไม่ใช่ห่อทุกอย่าง

## สิ่งที่แก้จากสถานการณ์พัง

1. Card grid เป็น 1 column บนมือถือ + `minmax(0, 1fr)` บน md
2. `Button` ใช้ `cn()` ทำให้ `className="px-2"` ทับ size ได้
3. `Input` ผูก `aria-invalid` และ `aria-describedby`
4. `Modal` ตั้ง `document.body.style.overflow = "hidden"` ระหว่างเปิด
