# Lab — Beginner: Kanban Task Board (Svelte 5 Runes)

## เป้าหมาย

สร้าง **Task Board** แบบ Kanban ด้วย Vite + Svelte 5 + TypeScript
ฝึก `$state` / `$derived` / `$effect` / `$props` / snippets และแยก logic ออกเป็น module `.svelte.ts`

เมื่อทำจบ คุณควร:

- อธิบายได้ว่าทำไม column ต้องมาจาก `$derived` ไม่ใช่ state ซ้ำ
- แยก UI component กับ board logic ได้ชัด
- ใช้ snippets หรือ props สำหรับหัว column ได้อย่างถูกต้อง

---

## โจทย์

สร้างแอปที่รองรับ:

| feature       | คำอธิบาย                                                               |
| ------------- | ---------------------------------------------------------------------- |
| Columns       | column `todo` / `doing` / `done` กรองด้วย `$derived` จากรายการงานเดียว |
| Create task   | form มี `title` (บังคับ) และ `priority` = `low` \| `medium` \| `high`  |
| Move next     | ปุ่มเลื่อนสถานะไป column ถัดไป (`todo → doing → done`)                 |
| Toggle done   | checkbox สลับระหว่าง `done` กับ `todo`                                 |
| Column header | ใช้ **snippet** หรือ props ส่งหัว column + จำนวนงาน                    |
| TypeScript    | ใช้ `lang="ts"` และ type ของ Task ชัดเจน                               |

### โครงข้อมูล Task

```ts
type Priority = 'low' | 'medium' | 'high';
type TaskStatus = 'todo' | 'doing' | 'done';

type Task = {
  id: string;
  title: string;
  priority: Priority;
  status: TaskStatus;
  createdAt: string; // ISO
};
```

### โครงสร้างที่แนะนำ

```
lab/solution/
 package.json
 vite.config.ts
 tsconfig.json
 index.html
 src/
 App.svelte
 main.ts
 app.css
 vite-env.d.ts
 lib/
 types.ts
 board.svelte.ts # $state + actions + $derived filters
 components/
 TaskColumn.svelte
 TaskItem.svelte
 TaskForm.svelte
```

### ข้อกำหนดบังคับ

1. ใช้ **Svelte 5 runes เท่านั้น** (`$state`, `$derived`, `$effect`, `$props`, `$bindable` ถ้าจำเป็น)
2. Event ใช้ `onclick=` / `onchange=` — **ห้าม** `on:click`
3. State หลักอยู่ใน `board.svelte.ts` — component ไม่ถือ array ดิบซ้ำเป็น source of truth
4. จำนวนงานต่อ column คำนวณจาก `$derived` (ห้าม sync ด้วย `$effect`)
5. `{#each}` ใส่ key เป็น `task.id`
6. สไตล์เรียบง่ายโทน **teal / slate** (ไม่ใช้ธีมม่วง)

---

## เกณฑ์ผ่าน

- [ ] เพิ่มงานใหม่เข้า column To Do ได้
- [ ] กด Next เลื่อนสถานะตามลำดับได้
- [ ] ติ๊ก checkbox แล้วงานไป Done (และติ๊กออกกลับ To Do ได้)
- [ ] แต่ละ column แสดงเฉพาะงานของสถานะนั้น + จำนวนถูกต้อง
- [ ] ไม่มี `$effect` ที่ใช้ sync ค่า derived กลับเข้า state

---

## คำใบ้

- Generate id ด้วย `crypto.randomUUID()`
- ใน `.svelte.ts` ประกาศ `export const board = $state(...)` แล้ว export function filter (เช่น `tasksByStatus`) — **ห้าม `export const x = $derived(...)` จาก module** ให้ห่อ `$derived` ใน component แทน
- Snippet หัว column รับ parameter ได้ เช่น `Snippet<[{ count: number }]>`
- Mutation ของ array/object จาก `$state` ใน Svelte 5 ทำได้ตรง ๆ (เช่น `tasks.push(...)`)

---

## วิธีรัน

```bash
cd lab/solution
npm install
npm run dev
```

ตัวอย่างประกอบบทเรียนอื่น:

```bash
cd examples/01-compiler-reactivity && npm install && npm run dev
cd examples/02-runes-state-derived && npm install && npm run dev
cd examples/03-templating-components && npm install && npm run dev
cd examples/04-events-snippets && npm install && npm run dev
```

---

## เฉลย

ดูโค้ดเต็มใน [`lab/solution/`](./lab/solution/)

### สรุปไฟล์สำคัญในเฉลย

| ไฟล์                           | บทบาท                                                                                           |
| ------------------------------ | ----------------------------------------------------------------------------------------------- |
| `lib/types.ts`                 | นิยาม `Task`, `Priority`, `TaskStatus` และ helper `nextStatus`                                  |
| `lib/board.svelte.ts`          | `$state` ของรายการงาน + `tasksByStatus()` + actions (`createTask`, `advanceTask`, `toggleDone`) |
| `components/TaskForm.svelte`   | form สร้างงานด้วย local `$state` แล้วเรียก `createTask`                                         |
| `components/TaskItem.svelte`   | แสดง 1 งาน, checkbox, ปุ่ม Next / ลบ                                                            |
| `components/TaskColumn.svelte` | รับ `tasks` + snippet `header` แล้ว `{#each}` รายการ                                            |
| `App.svelte`                   | ประกอบ form + 3 column — `$derived(tasksByStatus(...))` ใน component                            |

### จุดที่ควรอ่านในเฉลย

1. **Source of truth เดียว** — `board.tasks` เป็น array เดียว column มาจาก filter ที่ห่อด้วย `$derived` ใน `App.svelte` (ไม่ export `$derived` จาก module)
2. **Actions อยู่กับ state** — UI เรียก function ไม่ mutate prop ของลูกโดยตรงแบบ ad-hoc
3. **Snippet หัว column** — `TaskColumn` ไม่ hardcode ชื่อ column ให้ parent ส่งผ่าน `{#snippet header({ count })}`
4. **`$effect` ใช้แค่ log** — เป็น side effect ไม่ได้คำนวณจำนวนงาน

ถ้าติด ให้เทียบไฟล์ใน `lab/solution/src/` ทีละชั้น: types → board → components → App
