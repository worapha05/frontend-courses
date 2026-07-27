# Lab — Beginner: Personal Task Board (Context + Validation)

## เป้าหมาย

สร้าง **Personal Task Board** ด้วย Vite + React + TypeScript
ฝึก Immutable State, Context API และ Form Validation ด้วย Zod

## โจทย์

สร้างแอปที่รองรับ:

| feature     | คำอธิบาย                                                              |
| ----------- | --------------------------------------------------------------------- |
| เพิ่มงาน    | form มี `title` (บังคับ) และ `priority` = `low` \| `medium` \| `high` |
| รายการงาน   | แสดง title, priority, สถานะ done                                      |
| Toggle done | คลิก checkbox เพื่อสลับสถานะ                                          |
| กรอง        | ปุ่ม All / Active / Done                                              |
| Theme       | สลับ light/dark ผ่าน Context (ไม่ใช่ prop drilling)                   |
| Persist     | บันทึก tasks + theme ลง `localStorage`                                |

### โครงข้อมูล Task

```ts
type Priority = 'low' | 'medium' | 'high';

type Task = {
  id: string;
  title: string;
  priority: Priority;
  done: boolean;
  createdAt: string; // ISO
};
```

### ข้อกำหนดบังคับ

1. มี `TaskProvider` (Context) แยกจาก UI components
2. มี `ThemeProvider` แยกอีกตัว — อย่ารวม Context ยักษ์เดียว
3. Validate form ด้วย Zod: `title` trim แล้วยาว 3–80 ตัวอักษร
4. update state แบบ immutable เท่านั้น
5. Derived values (เช่นจำนวน active) **คำนวณตอน render** อย่าเก็บใน state ซ้ำ
6. ใช้ TypeScript แบบ strict — ห้าม `any`

### UX ที่ควรมี

- แสดง field error ใต้ช่อง title เมื่อ validation ไม่ผ่าน
- Disable ปุ่ม submit ตอน title ว่างหลัง trim
- แสดง badge สีตาม priority

## เกณฑ์ผ่าน

- [ ] เพิ่ม / toggle / กรอง งานได้
- [ ] Theme สลับได้และคงอยู่หลัง reload
- [ ] Tasks คงอยู่หลัง reload
- [ ] Validation ทำงานก่อนเพิ่มงาน
- [ ] ไม่มี prop drilling ของ theme/tasks ผ่านหลายชั้นโดยไม่จำเป็น

## คำใบ้

- Generate id ด้วย `crypto.randomUUID()`
- เมื่อ hydrate จาก `localStorage` ให้ validate โครงด้วย Zod หรือ type guard
- `useMemo` สำหรับ value ของ Context เพื่อกัน re-render เกินจำเป็น

## เฉลย

ดูโค้ดเต็มที่ [`lab/solution/`](./lab/solution/)

```bash
cd lab/solution
npm install
npm run dev
```
