# Lab ระดับ Intermediate — ระบบกรองสินค้า Real-time “FilterForge”

## เป้าหมาย

ออกแบบสถาปัตยกรรมข้อมูลสำหรับ **FilterForge** — แผงค้นหาสินค้าแอดมินที่:

- ผู้ใช้พิมพ์ค้นหา + เปลี่ยนหมวด + scroll โหลดต่อเนื่อง
- มี **NgRx** เก็บ UI intent และ sync side effects (หรือเทียบเท่า action→effect flow)
- มี **TanStack Query** จัดการ infinite list + mutation invalidation
- มี **Apollo cache helpers** สำหรับ update entity / `@client` badge

ทำด้วยตัวเองก่อน แล้วค่อยเทียบกับ [`lab/solution/`](./lab/solution/)

---

## กรณีศึกษา

Marketplace ภายในบริษัทมีหน้าค้นหาสินค้าที่ช้าและข้อมูลเพี้ยนเพราะ:

1. ทุก keystroke ยิง API โดยไม่ยกเลิก request เก่า → ผลลัพธ์แข่งกัน (race)
2. สร้างสินค้าแล้ว list ไม่ refresh
3. stock ในหน้ารายละเอียดกับหน้า list ไม่ตรงกัน (ไม่มี normalized identity)

CTO ขอให้ redesign ระดับ intermediate

---

## โจทย์

### ส่วนที่ 1 — NgRx Filter Intent + Effect

สร้าง feature `filters`:

**State**

```ts
{
  q: string;
  category: 'all' | 'books' | 'gadgets';
  debouncedQ: string; // ค่าหลัง debounce ที่ใช้ยิง API
}
```

**Actions**

- `queryChanged({ q })`
- `categoryChanged({ category })`
- `debounceTick({ q })` หรือ effect ที่ emit action เมื่อ debounce แล้ว

**Effect**

- เมื่อ `queryChanged` → `debounceTime(300)` + `distinctUntilChanged` → dispatch ค่าที่พร้อมค้นหา
- อธิบายใน `NOTES.md` ว่าทำไมต้อง debounce ที่ effect ไม่ใช่ยิง API ใน component ตรง ๆ

> ถ้าไม่รัน Angular ได้ ให้เขียนเป็น RxJS effect function แบบใน examples ได้เต็มคะแนน

### ส่วนที่ 2 — React Query Infinite + Mutation

1. `useInfiniteQuery` สำหรับสินค้า โดย `queryKey` รวม `debouncedQ` + `category`
2. นโยบาย cache: `staleTime` ≥ 20s สำหรับ list, อธิบายทำไมใน NOTES
3. `useMutation` สร้างสินค้า แล้ว `invalidateQueries` ให้ list refresh
4. เปลี่ยนหมวด/คำค้นต้องไม่ทำให้ UI ว่างทันที — ใช้ `placeholderData` หรือเก็บ pages อย่างเหมาะสม

### ส่วนที่ 3 — Apollo Entity Patch

สมมติหลัง mutation สำเร็จคุณได้ `product { id name price inStock }`

1. เขียน helper `writeProductToCache` ด้วย `writeFragment`
2. มี local field `cartItemCount @client` และปุ่มเพิ่มค่า
3. ใน NOTES อธิบายว่าเมื่อไหร่ใช้ cache write ตรง vs invalidate ทั้ง list

### ส่วนที่ 4 — สถานการณ์จำลอง (ตอบใน NOTES)

1. ผู้ใช้พิมพ์ `mac` เร็วมาก — request ของ `m` และ `ma` ยังไม่กลับ ผลของ `mac` กลับก่อน แล้ว `ma` กลับทีหลัง จะเกิดอะไรถ้าใช้ `mergeMap` แทน `switchMap`?
2. `staleTime` กับ `gcTime` ในหน้านี้ตั้งอย่างไร ทำไม?
3. ถ้า FilterForge ต้องรองรับ “filter เปลี่ยนแล้ว URL sync” — state ไหนควรเป็น source of truth?

---

## เกณฑ์ผ่าน

- [ ] มี debounce pipeline สำหรับ search intent
- [ ] infinite query key ผูกกับ filter ที่ debounce แล้ว
- [ ] mutation invalidation ทำงานในโค้ดเฉลย/ของคุณ
- [ ] Apollo fragment write + `@client` มีตัวอย่าง
- [ ] NOTES ตอบสถานการณ์ race / cache policy / URL sync

---

## เฉลย

ดูโค้ดเต็มที่ [`lab/solution/`](./lab/solution/)
