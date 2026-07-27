# PulseBoard — NOTES

## Ownership ADR

| ข้อมูล               | Owner                      | เหตุผล                              |
| -------------------- | -------------------------- | ----------------------------------- |
| orders list / detail | React Query cache          | แหล่งความจริงอยู่ server + realtime |
| selectedOrderIds     | RTK `gridUi`               | UI intent ข้าม panel                |
| hiddenColumns        | RTK `gridUi`               | preference ของผู้ใช้                |
| draftNote ต่อออเดอร์ | RTK `drafts`               | ยังไม่ commit — เป็น client overlay |
| presence (optional)  | RTK หรือ channel store แยก | ไม่ใช่ server entity ของออเดอร์     |

## Conflict: optimistic vs websocket

นโยบายที่เลือกใน lab นี้: **server event เป็นผู้ชนะหลัง settle**

1. ระหว่าง mutate: UI เชื่อ optimistic
2. เมื่อมี websocket event ของ id เดียวกัน: `setQueryData` ทับด้วยของ server
3. `onSettled` invalidate เพื่อยืนยันรอบสุดท้าย

ถ้าธุรกิจต้องการ “local queue wins จน sync สำเร็จ” ต้องมี version/vector clock — อย่าทำเงียบ ๆ

## ทำไม draft note ≠ order status

- draft note = ความตั้งใจที่ยังไม่ขึ้น server → Client Store
- status = ความจริงของคลังที่คนอื่นเปลี่ยนได้ → Server Cache

## Prefetch ทั้ง list ตอน login?

ไม่เสมอไป — ดีเมื่อหน้าแรกใช้ list แน่ ๆ และข้อมูลไม่ใหญ่
เสียเมื่อ user ส่วนใหญ่ไปหน้าอื่น หรือ list หนักมาก → prefetch ตาม navigation intent (hover/route) ดีกว่า

## Offline conflict policy (lab)

- Persistence อ่านได้เมื่อเปิดแอปออฟไลน์
- Mutation ตอนออฟไลน์ใช้ `networkMode: 'offlineFirst'` (คิวใน memory ของ session)
- เมื่อออนไลน์: flush แล้วให้ server response + realtime เป็นตัวจริง
- ไม่ทำ merge field-level ใน lab นี้ (last-write-wins ระดับ document)
