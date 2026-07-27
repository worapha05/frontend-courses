# 05 — Vite ShopDesk (รันได้จริง)

Mini app ที่รวม Beginner patterns ทั้งสาม:

| ส่วน                         | เครื่องมือ         | ชนิด state                        |
| ---------------------------- | ------------------ | --------------------------------- |
| Sidebar / filter / selection | **Redux Toolkit**  | Client State                      |
| รายการออเดอร์                | **TanStack Query** | Server State (REST mock)          |
| หมวดหมู่ catalog             | **Apollo Client**  | Server State (GraphQL public API) |

## รัน

```bash
# จาก root ของ bootcamp
npm run dev:beginner

# หรือเข้า folder นี้โดยตรง
cd 01-beginner/examples/05-vite-shopdesk
npm install
npm run dev
```

เปิด http://localhost:5173

## สิ่งที่ควรสังเกตตอนเล่น

1. เปลี่ยน filter → `queryKey` เปลี่ยน → React Query โหลดชุดใหม่ (ออเดอร์ไม่อยู่ใน Redux)
2. คลิกออเดอร์ → เก็บแค่ `selectedOrderId` ใน RTK
3. หมวดใน sidebar มาจาก Apollo `useQuery` (countries API จำลองเป็น categories)
4. ปุ่มสลับ sidebar = Client State ล้วน ๆ
