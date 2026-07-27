# Level 2 — Intermediate: Reactive Store & Server State Architecture

เป้าหมายระดับนี้: ออกแบบ **side effects**, **cache policy**, และ **normalized GraphQL cache**
ให้ระบบ reactive ได้อย่างถูกต้อง ไม่ใช่แค่ “โหลดข้อมูลมาโชว์”

---

## สารบัญ

1. [จาก Beginner สู่สถาปัตยกรรม](#1-จาก-beginner-สู่สถาปัตยกรรม)
2. [NgRx สำหรับ Angular Enterprise](#2-ngrx-สำหรับ-angular-enterprise)
3. [Effects กับ RxJS Operators](#3-effects-กับ-rxjs-operators)
4. [React Query Advanced — staleTime vs gcTime](#4-react-query-advanced--staletime-vs-gctime)
5. [Pagination, Infinite Query และ Mutation Invalidation](#5-pagination-infinite-query-และ-mutation-invalidation)
6. [Apollo Normalized Cache](#6-apollo-normalized-cache)
7. [Local State ด้วย `@client`](#7-local-state-ด้วย-client)
8. [Best Practices สรุป](#8-best-practices-สรุป)

---

## 1. จาก Beginner สู่สถาปัตยกรรม

ระดับ Beginner แยก Client/Server ได้แล้ว
ระดับ Intermediate โฟกัสคำถามที่ยากขึ้น:

| คำถาม                       | ทำไมสำคัญ                                |
| --------------------------- | ---------------------------------------- |
| Side effect อยู่ที่ไหน?     | กันไม่ให้ component ยิง API กระจัดกระจาย |
| Cache เก่าเมื่อไหร่?        | UX เร็ว vs ข้อมูลถูกต้อง                 |
| Entity แชร์ข้ามหน้าอย่างไร? | ลด refetch และ inconsistency             |
| Mutation แล้วใครต้องรู้?    | Invalidation / cache update ที่ถูกจุด    |

```
User Intent (UI Store)
 ↓
 Query Key / Action
 ↓
 Effect / queryFn / GraphQL
 ↓
 Cache (RQ / Apollo / NgRx entity)
 ↓
 Selective Selectors → Views
```

---

## 2. NgRx สำหรับ Angular Enterprise

NgRx = Redux pattern + RxJS สำหรับ Angular

| ส่วน          | หน้าที่                                                     |
| ------------- | ----------------------------------------------------------- |
| **Actions**   | เหตุการณ์ในระบบ (`loadOrders`, `loadOrdersSuccess`)         |
| **Reducers**  | update state แบบ pure จาก action                            |
| **Selectors** | อ่าน/derive state แบบ memoized                              |
| **Effects**   | ดัก action แล้วทำ side effect (HTTP, websocket, navigation) |

ทำไม enterprise ชอบ NgRx:

- action log ชัด → debug / audit ง่าย
- effects รวมจุดเรียก API
- selectors แชร์ logic การคำนวณ
- เข้ากับ Angular DI + RxJS ที่ทีมใช้อยู่แล้ว

> **อย่า** ใส่ทุก HTTP call ลง NgRx โดยอัตโนมัติ
> ถ้าเป็น server list ธรรมดาที่ไม่มี workflow ซับซ้อน — พิจารณา Angular Query / resource patterns ได้
> แต่ในหลักสูตรนี้เราเจาะ NgRx เพราะเป็นมาตรฐาน enterprise ที่ต้องเชี่ยวชาญ

ดูตัวอย่าง: [`examples/01-ngrx-enterprise/`](./examples/01-ngrx-enterprise/)

### Action naming

แนวทางที่นิยม:

```text
[Orders Page] Load Orders
[Orders API] Load Orders Success
[Orders API] Load Orders Failure
```

แยก **intent จาก UI** กับ **ผลจาก API** ชัดเจน

---

## 3. Effects กับ RxJS Operators

Effect ทั่วไป:

```ts
loadOrders$ = createEffect(() =>
  this.actions$.pipe(
    ofType(OrdersActions.loadOrders),
    switchMap(({ status }) =>
      this.api.getOrders(status).pipe(
        map((orders) => OrdersActions.loadOrdersSuccess({ orders })),
        catchError((error) => of(OrdersActions.loadOrdersFailure({ error: String(error) }))),
      ),
    ),
  ),
);
```

### Operators ที่ต้องเข้าใจ

| Operator       | พฤติกรรม                              | ใช้เมื่อ                      |
| -------------- | ------------------------------------- | ----------------------------- |
| `switchMap`    | ยกเลิกงานเก่าเมื่อมี action ใหม่      | ค้นหา / filter ที่เปลี่ยนเร็ว |
| `concatMap`    | ทำทีละคิวตามลำดับ                     | สร้างออเดอร์ที่ต้องเรียงลำดับ |
| `exhaustMap`   | ละเว้น action ใหม่จนกว่างานปัจจุบันจบ | กัน double-submit ปุ่ม Save   |
| `mergeMap`     | ขนานได้                               | งานอิสระหลายตัว               |
| `catchError`   | แปลง error เป็น action/stream ใหม่    | ห้ามให้ effect ตายเงียบ       |
| `debounceTime` | หน่วงก่อนยิง                          | typeahead                     |

**กับดัก:** ลืม `catchError` ใน inner observable → effect stream พังหลัง error ครั้งแรก

---

## 4. React Query Advanced — staleTime vs gcTime

สองค่าที่คนสับสนบ่อย:

| ค่า                           | ความหมาย                                     | คำถามที่ตอบ                             |
| ----------------------------- | -------------------------------------------- | --------------------------------------- |
| **staleTime**                 | ข้อมูลถือว่า “สด” นานแค่ไหน                  | ต้อง refetch ตอน mount/focus อีกไหม?    |
| **gcTime** (เดิม `cacheTime`) | เก็บ cache ไว้หลังไม่มี subscriber นานแค่ไหน | กลับมาหน้าเดิมแล้วยังเห็น data เก่าไหม? |

```
fetch สำเร็จ
 │
 ├─ ภายใน staleTime → fresh → ไม่ refetch อัตโนมัติ
 │
 └─ หลัง staleTime → stale → ยังโชว์ data ได้ แต่พร้อม background refetch

ไม่มี component ใช้ query แล้ว
 │
 └─ หลัง gcTime → ลบ cache ทิ้ง
```

แนวทางเลือกค่า:

- ข้อมูลเปลี่ยนบ่อย (ราคาหุ้น): `staleTime: 0`
- master data (ประเทศ, categories): `staleTime` นาที–ชั่วโมง
- หน้า list ที่ผู้ใช้สลับไปมา: `gcTime` ยาวพอไม่ให้กระพริบโหลดใหม่ทุกครั้ง

ดูตัวอย่าง: [`examples/02-react-query-advanced/`](./examples/02-react-query-advanced/)

---

## 5. Pagination, Infinite Query และ Mutation Invalidation

### Page-based pagination

```ts
useQuery({
  queryKey: ['products', { page, pageSize }],
  queryFn: () => fetchProducts({ page, pageSize }),
  placeholderData: keepPreviousData, // UX ลื่นตอนเปลี่ยนหน้า
});
```

### Infinite query

เหมาะกับ “โหลดเพิ่ม” แบบ feed / scroll:

```ts
useInfiniteQuery({
  queryKey: ['feed'],
  queryFn: ({ pageParam }) => fetchFeed(pageParam),
  initialPageParam: 1,
  getNextPageParam: (last) => last.nextPage ?? undefined,
});
```

### Mutation + Invalidation

```ts
useMutation({
  mutationFn: createProduct,
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ['products'] });
  },
});
```

`invalidateQueries` ทำเครื่องหมายว่า stale และ refetch queries ที่กำลัง active
นี่คือหัวใจของ **automated cache sync** หลังเขียนข้อมูล

ทางเลือกอื่น:

- `setQueryData` update cache ตรง ๆ (เร็ว แต่ต้องระวังความครบของ shape)
- optimistic update (เจาะลึกใน Expert)

---

## 6. Apollo Normalized Cache

Apollo เก็บ object ตาม `__typename` + `id` (หรือ `keyFields` ที่กำหนด)

```
Query.products → ["Product:1", "Product:2"]
Product:1 → { id, name, price }
Product:2 → { id, name, price }
```

ข้อดี:

- query A update `Product:1` → query B ที่อ้าง entity เดียวกันเห็นของใหม่
- ลดข้อมูลซ้ำใน cache

### อ่าน / เขียน cache โดยตรง

- `cache.readQuery` / `writeQuery` — ตาม query document
- `cache.readFragment` / `writeFragment` — ตาม entity ชิ้นเดียว
- `cache.modify` — แก้ field แบบละเอียด

ดูตัวอย่าง: [`examples/03-apollo-normalized-cache/`](./examples/03-apollo-normalized-cache/)

### typePolicies ที่พบบ่อย

- `keyFields` สำหรับ type ที่ id ไม่ใช่ `id`
- pagination field policies (`merge` / `keyArgs`)
- `read` function สำหรับ derived local fields

---

## 7. Local State ด้วย `@client`

บาง field ไม่ได้มาจาก server — เก็บใน Apollo cache เป็น client-only:

```graphql
query CartBadge {
  cartItemCount @client
}
```

ใช้เมื่อ:

- ทีม GraphQL-first อยากอ่าน UI state ผ่าน query เดียวกัน
- ต้องการ reactive field ที่ derive จาก cache

ไม่ใช้เมื่อ:

- state เป็น React-local จริง ๆ (เช่น input ชั่วคราว) — `useState` ง่ายกว่า
- ทีมไม่ได้ใช้ GraphQL เป็นหลักทั้งแอป

---

## 8. Best Practices สรุป

1. **NgRx Effects ต้องมี failure action + catchError เสมอ**
2. **เลือก `switchMap`/`exhaustMap` ให้ถูกกับ UX** — ผิดตัว = race หรือพลาดคลิก
3. **ตั้ง `staleTime` ตามความถี่ของข้อมูลจริง** ไม่ copy ค่า default ทุก query
4. **mutation สำเร็จ → invalidate เป็นค่าเริ่มต้นที่ปลอดภัย** แล้วค่อย optimize ด้วย `setQueryData`
5. **Apollo: กำหนด identity ของ entity ให้ชัด** (`keyFields`) ตั้งแต่แรก
6. **อย่า normalize ใน Redux ซ้ำกับ Apollo** โดยไม่มีเหตุผล — เลือกเจ้าของ entity คนเดียว
7. **infinite query เก็บ page params ให้เป็น serializable** ใน queryKey ที่เกี่ยวข้อง

---

## Checklist ก่อนขึ้น Expert

- [ ] เขียน NgRx action/reducer/selector/effect ครบวงจรได้
- [ ] อธิบายความต่าง `staleTime` กับ `gcTime` ได้โดยไม่สับสน
- [ ] ใช้ `useInfiniteQuery` + `useMutation` invalidation ได้
- [ ] อ่าน/เขียน Apollo cache และอธิบาย normalized store ได้
- [ ] ตัดสินใจได้ว่า field ไหนควร `@client` vs React state

ไปต่อที่ [`../03-expert/`](../03-expert/) เมื่อพร้อม
