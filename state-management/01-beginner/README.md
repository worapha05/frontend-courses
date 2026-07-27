# Level 1 — Beginner: State Paradigms & Basic Stores

เป้าหมายระดับนี้: ให้คุณแยก **Client State vs Server State** และ **Local vs Global** ได้ชัดเจน
แล้วเริ่มตั้งค่า **Redux Toolkit**, **TanStack Query**, และ **Apollo Client** ได้อย่างถูกต้อง

---

## สารบัญ

1. [State Management Shifting — ทำไมโลกเปลี่ยน](#1-state-management-shifting--ทำไมโลกเปลี่ยน)
2. [Client State vs Server State](#2-client-state-vs-server-state)
3. [Local State vs Global State](#3-local-state-vs-global-state)
4. [ออกแบบ Data Flow ระดับพื้นฐาน](#4-ออกแบบ-data-flow-ระดับพื้นฐาน)
5. [Redux Toolkit Foundations](#5-redux-toolkit-foundations)
6. [TanStack Query Basics](#6-tanstack-query-basics)
7. [Apollo Client Basics](#7-apollo-client-basics)
8. [Best Practices สรุป](#8-best-practices-สรุป)
9. [Mini Vite App — รันดู data flow จริง](#9-mini-vite-app--รันดู-data-flow-จริง)

---

## 1. State Management Shifting — ทำไมโลกเปลี่ยน

เมื่อก่อนทีมมักยัด **ทุกอย่างลง Redux**: UI flags, form values, API responses, loading flags
ผลคือ Store บวม, boilerplate สูง, และ cache จาก server ไม่มีนโยบายชัดเจน (stale / refetch / dedupe)

ปัจจุบันแนวคิดหลักคือ:

| ประเภท           | เจ้าของที่เหมาะสม                   | ตัวอย่างเครื่องมือ                      |
| ---------------- | ----------------------------------- | --------------------------------------- |
| **Client State** | UI / domain workflow ของแอป         | `useState`, Context, RTK, Zustand, NgRx |
| **Server State** | ข้อมูลที่มาจาก backend และต้อง sync | TanStack Query, Apollo, RTK Query, SWR  |

> **กฎทองระดับ Beginner:** ถามก่อนว่า “ข้อมูลนี้เป็นความจริงของ UI หรือเป็นความจริงของ Server?”
> ถ้าเป็นของ Server — อย่าเก็บเป็น source of truth ใน Redux โดยไม่มีเหตุผล

ดูแผนภาพเปรียบเทียบ: [`examples/01-state-paradigms/`](./examples/01-state-paradigms/)

---

## 2. Client State vs Server State

### Client State

ข้อมูลที่ **แอปสร้างและควบคุมเอง** ไม่มีแหล่งความจริงบน server (หรือไม่จำเป็นต้อง sync ทันที)

ตัวอย่าง:

- เปิด/ปิด modal, sidebar, drawer
- theme (light/dark), locale ที่เลือกใน session
- wizard step ปัจจุบัน, selected tab
- form draft ที่ยังไม่ submit
- filter UI ที่ยังไม่ยิง API (debounce อยู่)

ลักษณะสำคัญ:

- update ทันทีจาก user interaction
- ไม่ต้องกังวล “ข้อมูลเก่าจาก server”
- มักมีอายุสั้น (ตาม session / ตามหน้า)

### Server State

ข้อมูลที่ **แหล่งความจริงอยู่ที่ backend** — อาจเปลี่ยนโดยคนอื่น, ระบบอื่น, หรือเวลา

ตัวอย่าง:

- รายการสินค้า, โปรไฟล์ผู้ใช้, order history
- permission / feature flags จาก API
- ผลค้นหา, pagination pages
- GraphQL entities ที่หลาย query แชร์กัน

ลักษณะสำคัญ:

- มีสถานะ async: idle / loading / success / error
- ต้องจัดการ cache, stale, refetch, retry, deduplication
- หลาย component อ่านชุดข้อมูลเดียวกันได้ — ควร share cache

### ตารางตัดสินใจเร็ว

| สถานการณ์                                           | ใส่ที่ไหน                                  |
| --------------------------------------------------- | ------------------------------------------ |
| `isSidebarOpen`                                     | Client (local หรือ global UI store)        |
| `products` จาก `GET /products`                      | Server cache (React Query / Apollo)        |
| `selectedProductId` สำหรับ highlight ในตาราง        | Client (มัก local หรือ UI slice)           |
| `cartItems` ที่ sync กับ backend cart               | Server cache + mutation (อาจมี optimistic) |
| `cartItems` ที่เป็น guest cart ใน memory ก่อน login | Client ได้ จนกว่าจะ sync                   |

---

## 3. Local State vs Global State

แม้เป็น Client State ก็ยังต้องเลือกว่า **local หรือ global**

### Local State

อยู่ใกล้ component ที่ใช้ (`useState`, `useReducer`)

เหมาะเมื่อ:

- มี component เดียวใช้ (หรือลูกใกล้ ๆ ผ่าน props)
- ไม่ต้องแชร์ข้าม route / feature ไกล
- อยากให้ state หายเมื่อ unmount (พฤติกรรมดีสำหรับ form ชั่วคราว)

### Global State

อยู่ใน store กลาง (RTK, NgRx, Context ที่วางสูง)

เหมาะเมื่อ:

- หลาย feature อ่าน/เขียนชุดเดียวกัน
- ต้องรอดข้าม navigation
- มี business rules ที่อยากรวมศูนย์ (เช่น auth session UI flags, feature tour)

```
Local ──────────────────────────────────────► Global
useState  Context  RTK/NgRx
(form input) (theme provider) (cross-feature workflow)
```

> **Anti-pattern:** ยกทุกอย่างขึ้น global “เผื่อวันหน้าใช้” — ทำให้ debug ยากและ re-render กว้างโดยไม่จำเป็น

---

## 4. ออกแบบ Data Flow ระดับพื้นฐาน

### แบบที่ 1 — UI-only (Client)

```
User Event → dispatch / setState → Store/State → Selector/Render → UI
```

### แบบที่ 2 — Server read (Query)

```
Mount / Key change → useQuery(key, fetcher)
    ↓
   Server Cache
    ↓
   isLoading / data / error → UI
```

### แบบที่ 3 — Server write (Mutation)

```
User Action → useMutation → API
   ↓
  invalidate / setQueryData
   ↓
  UI update จาก cache
```

### แบบที่ 4 — ผสม (แนะนำในแอปจริง)

```
┌─────────────────┐ ┌──────────────────────┐
│ Client Store │ │ Server Cache │
│ (RTK / NgRx) │ │ (RQ / Apollo) │
│ filters, UI │────►│ queryKey = filters │
│ selection │ │ entities, pages │
└─────────────────┘ └──────────────────────┘
```

Client เก็บ **ความตั้งใจของ UI** (filters, selection)
Server Cache เก็บ **ผลลัพธ์จาก API** ตาม key ที่ derive จากความตั้งใจนั้น

---

## 5. Redux Toolkit Foundations

Redux แบบ classic มี boilerplate สูง — **Redux Toolkit (RTK)** เป็นมาตรฐานปัจจุบัน

แนวคิดหลัก:

| แนวคิด       | ความหมาย                                          |
| ------------ | ------------------------------------------------- |
| **Store**    | ต้นไม้ state เดียวของแอป                          |
| **Slice**    | หน่วยของ state + reducers + actions ที่เกี่ยวข้อง |
| **Action**   | เหตุการณ์ที่เกิดขึ้น (`type` + `payload`)         |
| **Reducer**  | function pure ที่คำนวณ state ใหม่จาก action       |
| **Selector** | function อ่าน state (ควรเฉพาะเจาะจง)              |
| **Hooks**    | `useSelector`, `useDispatch` (หรือ typed hooks)   |

### Immer ใน RTK

ใน `createSlice` คุณ “mutate” draft ได้ — RTK ใช้ Immer ทำให้ได้ immutable update จริง

### Flow ของ RTK

```
UI → dispatch(action) → reducer(slice) → new state → useSelector → re-render
```

ดูตัวอย่างเต็ม: [`examples/02-redux-toolkit-foundations/`](./examples/02-redux-toolkit-foundations/)

สิ่งที่ต้องจำในระดับ Beginner:

1. แยก slice ตาม **domain ของ UI/workflow** ไม่ใช่ตามหน้าจออย่างเดียว
2. ใส่เฉพาะ Client State ใน RTK — ยังไม่ต้องยัด API list ทั้งก้อน
3. สร้าง **typed hooks** (`useAppDispatch`, `useAppSelector`) ตั้งแต่แรก
4. Selector ควรคืนค่าที่ component ใช้จริง — อย่า `useSelector(s => s)` ทั้ง store

---

## 6. TanStack Query Basics

TanStack Query (React Query) คือ library สำหรับ **Server State**:

- dedupe request ที่ queryKey เดียวกัน
- cache ตาม key
- background refetch ตามนโยบาย
- สถานะ `isPending`, `isFetching`, `isError`, `data`

### QueryClient และ Provider

แอปต้องมี `QueryClient` หนึ่งตัว (หรือต่อขอบเขตที่ออกแบบ) ห่อด้วย `QueryClientProvider`

### `useQuery` พื้นฐาน

```ts
const { data, isPending, error } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
});
```

`queryKey` คือ **ตัวตนของ cache entry** — เปลี่ยน key = ชุดข้อมูลคนละชุด

ดูตัวอย่าง: [`examples/03-react-query-basics/`](./examples/03-react-query-basics/)

ค่าเริ่มต้นที่ควรรู้ (รายละเอียดลึกอยู่ระดับ Intermediate):

- **staleTime**: นานแค่ไหนถือว่า “ยังสด” ไม่ต้อง refetch ทันที
- **gcTime**: เก็บ cache ไว้นานแค่ไหนหลังไม่มี subscriber

---

## 7. Apollo Client Basics

Apollo Client คือ GraphQL client + **normalized cache** ในตัว

องค์ประกอบหลักระดับ Beginner:

| ส่วน                       | หน้าที่                       |
| -------------------------- | ----------------------------- |
| `ApolloClient`             | จัดการ network + cache        |
| `InMemoryCache`            | เก็บ entities แบบ normalize   |
| `ApolloProvider`           | inject client เข้า React tree |
| `useQuery` / `useMutation` | hooks สำหรับ operation        |

```
GraphQL Operation → Apollo Link → Network
    ↓
   InMemoryCache (normalized)
    ↓
   useQuery → UI
```

ดูตัวอย่าง: [`examples/04-apollo-client-basics/`](./examples/04-apollo-client-basics/)

ข้อแตกต่างสั้น ๆ กับ React Query:

- RQ เป็น **cache แบบ document/key** (เหมาะ REST และ generic async)
- Apollo เป็น **cache แบบ entity graph** (เหมาะ GraphQL ที่แชร์ object ข้าม query)

---

## 8. Best Practices สรุป

1. **เริ่มจาก local state** — ยกขึ้น global เมื่อมีเหตุผลจริง
2. **API data → Server Cache** ไม่ใช่ Redux เป็นค่าเริ่มต้น
3. **ตั้งชื่อ queryKey ให้เป็น array ที่มีโครงสร้าง** เช่น `['products', { page, q }]`
4. **RTK: typed store + typed hooks** ตั้งแต่วันแรก
5. **อย่าเก็บ derived state ที่คำนวณถูก** — คำนวณใน selector / `select` ของ query แทน
6. **loading ของ server ≠ loading ของ UI animation** — แยกความหมายให้ชัดในโค้ด
7. **อ่าน error และ empty state เป็น first-class** ไม่ใช่มีแค่ `data`

---

## 9. Mini Vite App — รันดู data flow จริง

หลังอ่านทฤษฎีและ examples 01–04 แล้ว ให้รันแอปรวม:

[`examples/05-vite-shopdesk/`](./examples/05-vite-shopdesk/)

```bash
# จาก root ของ bootcamp
npm run install:beginner # ครั้งแรก
npm run dev:beginner
```

หรือ:

```bash
cd 01-beginner/examples/05-vite-shopdesk
npm install
npm run dev
```

เปิด http://localhost:5173 แล้วสังเกต:

1. **Filter / selection / sidebar** → Redux Toolkit (Client State)
2. **รายการออเดอร์** → TanStack Query ตาม `queryKey` จาก filter
3. **หมวดใน sidebar** → Apollo Client GraphQL query

แอปนี้คือ version ที่เล่นได้ของแนวคิดเดียวกับ Lab **ShopDesk**

---

## Checklist ก่อนขึ้น Intermediate

- [ ] อธิบาย Client vs Server State ด้วยตัวอย่างจากงานตัวเองได้
- [ ] สร้าง RTK slice + store + typed hooks ได้
- [ ] ตั้ง `QueryClientProvider` และเขียน `useQuery` อ่าน REST ได้
- [ ] ตั้ง `ApolloProvider` และเขียน GraphQL `useQuery` ได้
- [ ] รัน `05-vite-shopdesk` แล้วอธิบาย data flow บนหน้าจอได้
- [ ] วาด data flow ของหน้าจอหนึ่งหน้า โดยไม่ duplicate server data ใน Redux

ไปต่อที่ [`../02-intermediate/`](../02-intermediate/) เมื่อพร้อม
