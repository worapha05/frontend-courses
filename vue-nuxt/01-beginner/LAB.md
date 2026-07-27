# Lab — Beginner: Reactive Task Board

## เป้าหมาย

สร้าง **Task Board** ด้วย Vue 3 Composition API ที่ฝึก reactivity, component boundaries และ composable

## โจทย์

สร้างแอป Vite + Vue (`lab/solution/`) ที่มี:

```
src/
 App.vue
 main.js
 components/
 TaskColumn.vue # รับ tasks + emit เหตุการณ์
 TaskItem.vue # แสดง 1 งาน + checkbox
 TaskForm.vue # v-model form สร้างงาน
 composables/
 useTaskBoard.js # state + computed + actions
```

### feature บังคับ

| feature     | รายละเอียด                                              |
| ----------- | ------------------------------------------------------- |
| Columns     | `todo` / `doing` / `done` แยกด้วย `computed` จาก status |
| Create      | form title + priority (`low`/`medium`/`high`)           |
| Move        | ปุ่มเลื่อน status ไป column ถัดไป                       |
| Toggle done | checkbox → status เป็น `done` หรือกลับ `todo`           |
| Filter      | กรองตาม priority ทั้งบอร์ด                              |
| Stats       | `computed` แสดงจำนวนต่อ column                          |
| Theme       | `provide`/`inject` สลับ light/dark จาก App              |

### โครงข้อมูล

```js
{
 id: number,
 title: string,
 priority: 'low' | 'medium' | 'high',
 status: 'todo' | 'doing' | 'done',
 createdAt: string // ISO
}
```

### ข้อกำหนดบังคับ

1. ใช้ `<script setup>` ทั้ง project
2. State หลักอยู่ใน `useTaskBoard` — component ไม่ถือ array ดิบซ้ำ
3. Derived counts ต้องเป็น `computed` (ห้าม `watch` เพื่อนับ)
4. `TaskForm` ใช้ `v-model` แบบ object หรือ field แยกก็ได้ แต่ต้อง emit ไม่ mutate props
5. มีอย่างน้อย 1 `watch` ที่ log เมื่อจำนวน `done` เปลี่ยน (side effect จริง)
6. `:key` ใช้ `task.id` เท่านั้น

## เกณฑ์ผ่าน

- [ ] สร้าง / ย้าย / ติ๊ก done ได้
- [ ] filter priority ทำงาน
- [ ] stats update ผ่าน computed
- [ ] theme inject ทำงานในลูกอย่างน้อย 1 ตัว
- [ ] ไม่มี prop mutation

## คำใบ้

- `const byStatus = computed(() => ({ todo: ..., doing: ..., done: ... }))`
- ใช้ `readonly` ถ้าอยากกันไม่ให้ข้างนอกแก้ state โดยตรง
- cleanup ไม่จำเป็นถ้ายังไม่ใส่ listener — แต่ถ้าใส่ต้องมี `onUnmounted`

## เฉลย

ดูโค้ดเต็มที่ [`lab/solution/`](./lab/solution/)

```bash
cd lab/solution
npm install
npm run dev
```
