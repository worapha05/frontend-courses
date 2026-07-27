# Lab ระดับ Expert — Offline-first Ops Grid “PulseBoard”

## เป้าหมาย

ออกแบบระบบ **PulseBoard**: แดชบอร์ดออเดอร์แบบ real-time + offline + optimistic สำหรับทีม operations

ต้องรวม:

- Optimistic toggle สถานะออเดอร์ (React Query) พร้อม rollback
- RTK เก็บ selection / column chrome เท่านั้น — **ไม่ duplicate** rows จาก API
- WebSocket mock update cache
- Persist cache โครง offline-first + prefetch หน้ารายละเอียด

ทำด้วยตัวเองก่อน แล้วค่อยเทียบกับ [`lab/solution/`](./lab/solution/)

---

## กรณีศึกษา

ศูนย์ fulfillment มีพนักงานหลายคนเปิด PulseBoard พร้อมกัน

ปัญหาเดิม:

1. กด “mark packed” แล้วรอ 800ms ทุกครั้ง — รู้สึกช้า
2. ออเดอร์ที่คนอื่นแพ็กแล้ว หน้าจอยังไม่เปลี่ยนจนกด refresh
3. เน็ตหลุดในคลัง — เปิดหน้าแล้วขาว poll น
4. Redux เก็บ `orders[]` ซ้ำกับ React Query → หลัง websocket มา Redux เก่า

คุณต้อง redesign ระดับ expert

---

## โจทย์

### ส่วนที่ 1 — Ownership ADR

ใน `NOTES.md` เขียนตาราง owner ของ:

- `orders` list / detail
- `selectedOrderIds`
- `hiddenColumns`
- `draftNote` ต่อออเดอร์ (ยังไม่ save)
- presence / “ใครกำลังเปิดออเดอร์นี้” (optional)

### ส่วนที่ 2 — Optimistic Pack

1. `useMutation` สำหรับ `packOrder(id)`
2. `onMutate` เปลี่ยนสถานะใน list cache ทันที
3. จำลอง server fail เมื่อ `id` ลงท้าย `-FAIL` → ต้อง rollback
4. `onSettled` invalidate อย่างเหมาะสม

### ส่วนที่ 3 — RTK Grid Chrome + Selective Select

1. slice สำหรับ selection + hidden columns
2. row component subscribe เฉพาะ “แถวนี้ถูกเลือกหรือไม่”
3. **ห้าม** `dispatch(setOrders)` จาก query result

### ส่วนที่ 4 — Realtime + Offline + Prefetch

1. mock socket ส่ง `order.updated` → `setQueryData` / invalidate list
2. ตั้ง `persistQueryClient` (หรือโครงเทียบเท่า) พร้อมอธิบาย conflict policy ใน NOTES
3. prefetch detail เมื่อ hover แถว

### ส่วนที่ 5 — คำถามคิด

1. ถ้า websocket กับ optimistic ชนกัน (local ตั้ง packed แต่ event บอก cancelled) ตัดสินอย่างไร?
2. ทำไม draft note ถึงอยู่ใน RTK แต่ order status อยู่ใน RQ?
3. Prefetch ทั้ง list ตอน login ดีเสมอไปหรือไม่?

---

## เกณฑ์ผ่าน

- [ ] ADR ownership ชัด
- [ ] optimistic + rollback ทำงานกับเคส `-FAIL`
- [ ] RTK ไม่เป็นสำเนาของ orders
- [ ] realtime sync เข้า cache
- [ ] มีโครง persistence + prefetch
- [ ] ตอบคำถามคิดครบ

---

## เฉลย

ดูโค้ดเต็มที่ [`lab/solution/`](./lab/solution/)
