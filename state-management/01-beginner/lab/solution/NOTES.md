# ShopDesk — NOTES

## Ownership

| ข้อมูล                           | Client / Server | Local / Global / Cache | เหตุผลสั้น ๆ                                 |
| -------------------------------- | --------------- | ---------------------- | -------------------------------------------- |
| `sidebarOpen`                    | Client          | Global (UI slice)      | แชร์ข้าม layout ของแอดมิน                    |
| `statusFilter`                   | Client          | Global (UI slice)      | ความตั้งใจของ UI — ใช้สร้าง queryKey         |
| `selectedOrderId`                | Client          | Global (UI slice)      | หลาย panel (ตาราง + รายละเอียด) อ่านร่วมกัน  |
| `orders` จาก API                 | Server          | React Query cache      | แหล่งความจริงอยู่ backend ต้อง stale/refetch |
| `catalog categories` จาก GraphQL | Server          | Apollo cache           | GraphQL entities แชร์ข้ามหน้าได้             |

## คำถามคิด

1. **ทำไม filter อยู่ RTK แต่ orders อยู่ RQ?**
   Filter คือความตั้งใจของผู้ใช้ (Client State) ส่วน orders คือผลจาก server ตามความตั้งใจนั้น (Server State)
   เมื่อ filter เปลี่ยน → queryKey เปลี่ยน → RQ โหลด/ใช้ cache ชุดใหม่โดยอัตโนมัติ

2. **ถ้า copy orders เข้า Redux หลัง query สำเร็จ?**
   จะมีสองแหล่งความจริง เมื่อ `invalidateQueries` update RQ แล้ว Redux อาจยังเก่า
   ต้องเขียน sync เองทุกจุด → race / bug / boilerplate สูง

3. **selectedOrderId เป็น local ได้ไหม?**
   ได้ ถ้ามีแค่ตารางเดียวและรายละเอียดเป็นลูกในต้นไม้เดียวกัน (props/lifting state)
   ข้อเสีย: ถ้ามี drawer / route อื่น / keyboard shortcut ข้าม feature จะแชร์ยาก — ShopDesk เลือก global UI slice เพราะมีรายละเอียดแยก panel
