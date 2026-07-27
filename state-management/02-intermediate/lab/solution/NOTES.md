# FilterForge — NOTES

## ทำไม debounce ที่ Effect?

Component ควรประกาศ **ความตั้งใจ** (`queryChanged`) ทันทีทุก keystroke
Effect รวมนโยบายเวลา (`debounceTime` + `distinctUntilChanged`) แล้วค่อยได้ `debouncedQ`
ข้อดี: ทดสอบได้, ใช้ซ้ำได้, UI ไม่ต้องรู้เรื่อง timing ของเครือข่าย

## Cache policy ของ list

- `staleTime: 20_000` — ผู้ใช้สลับหมวดไปกลับในเวลาสั้น ๆ ไม่ถูกยิงซ้ำทันทีทุกครั้ง
- `gcTime: 15 * 60_000` — ออกจากหน้าแล้วกลับมา ยังมี cache ให้โชว์เร็ว
- ข้อมูล stock ที่ต้องสดมากเป็นพิเศษ → ลด `staleTime` เฉพาะ query นั้น

## cache write vs invalidate

| วิธี                | ใช้เมื่อ                                                         |
| ------------------- | ---------------------------------------------------------------- |
| `invalidateQueries` | ปลอดภัยเมื่อไม่แน่ใจว่า list/page ไหนได้รับผล                    |
| `writeFragment`     | รู้ exact entity และ field ที่เปลี่ยน (เช่น แก้ชื่อสินค้า)       |
| ทั้งคู่             | update entity ที่เปิดอยู่ + invalidate list ที่อาจเรียงลำดับใหม่ |

## สถานการณ์จำลอง

1. **mergeMap แทน switchMap**
   request เก่าไม่ถูกยกเลิก ถ้า `ma` กลับหลัง `mac` UI จะแสดงผลของ `ma` ที่เก่ากว่า → race bug
   ต้องใช้ `switchMap` (หรือยกเลิก AbortController ใน queryFn)

2. **staleTime / gcTime**
   ตามด้านบน — list เน้นลด refetch รำคาญ แต่ยังไม่ยาวแบบ master data

3. **URL เป็น source of truth**
   เก็บ `q` + `category` ใน URL search params เป็นแหล่งความจริงของ shareable state
   Store อ่านจาก URL (หรือ sync สองทาง) — กัน bookmark / ปุ่ม Back พัง
