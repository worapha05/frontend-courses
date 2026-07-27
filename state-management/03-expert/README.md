# Level 3 — Expert: High-Performance Sync, Optimistic UI & Large Data Grids

เป้าหมายระดับนี้: ทำให้ UI **รู้สึกทันที**, ข้อมูล **ไม่ซ้ำซ้อน**, และระบบ **ทนต่อ offline / realtime / ข้อมูลมหาศาล**

---

## สารบัญ

1. [Optimistic UI — แนวคิดและกับดัก](#1-optimistic-ui--แนวคิดและกับดัก)
2. [Optimistic Updates ใน TanStack Query](#2-optimistic-updates-ใน-tanstack-query)
3. [Optimistic Updates ใน Apollo Client](#3-optimistic-updates-ใน-apollo-client)
4. [รวม Redux/NgRx กับ Server State โดยไม่ Duplicate](#4-รวม-reduxngrx-กับ-server-state-โดยไม่-duplicate)
5. [Performance สำหรับ Data Grid ขนาดใหญ่](#5-performance-สำหรับ-data-grid-ขนาดใหญ่)
6. [Real-time Sync — WebSocket / GraphQL Subscriptions](#6-real-time-sync--websocket--graphql-subscriptions)
7. [Offline-first และ Cache Prefetching](#7-offline-first-และ-cache-prefetching)
8. [Best Practices สรุประดับ Expert](#8-best-practices-สรุประดับ-expert)

---

## 1. Optimistic UI — แนวคิดและกับดัก

**Optimistic UI** = update หน้าจอเสมือนสำเร็จ **ก่อน** server ตอบ
ถ้า server ล้ม → **rollback** กลับค่าเดิม

เหมาะเมื่อ:

- งาน latency สูงแต่ผลลัพธ์คาดเดาได้ (like, toggle, rename, เปลี่ยนสถานะ)
- ความผิดพลาดไม่บ่อย และ rollback เข้าใจง่าย

ไม่เหมาะเมื่อ:

- ผลลัพธ์ขึ้นกับ server จริง ๆ (ราคาโปรโมชัน, inventory แข่งกัน)
- การ rollback สับสนผู้ใช้ (payment, irreversible delete โดยไม่มี undo)

```
onMutate: snapshot + patch UI
 ↓
request ไป server
 ↓
success → ยืนยัน / replace ด้วยของจริง
failure → restore snapshot
```

ดูตัวอย่าง: [`examples/01-optimistic-updates/`](./examples/01-optimistic-updates/)

---

## 2. Optimistic Updates ใน TanStack Query

ลายเซ็นมาตรฐาน:

```ts
useMutation({
  mutationFn: updateTodo,
  onMutate: async (vars) => {
    await queryClient.cancelQueries({ queryKey: key });
    const previous = queryClient.getQueryData(key);
    queryClient.setQueryData(key, (old) => patch(old, vars));
    return { previous };
  },
  onError: (_err, _vars, ctx) => {
    if (ctx?.previous) queryClient.setQueryData(key, ctx.previous);
  },
  onSettled: async () => {
    await queryClient.invalidateQueries({ queryKey: key });
  },
});
```

จุดสำคัญ:

1. **cancelQueries** — กัน refetch เก่าทับ optimistic ระหว่างทาง
2. **context.previous** — สำหรับ rollback
3. **onSettled invalidate** — ให้ของจริงจาก server เป็นตัวจบ (โดยเฉพาะ id ชั่วคราว)

---

## 3. Optimistic Updates ใน Apollo Client

สองทางหลัก:

1. `optimisticResponse` ใน `useMutation` — Apollo เขียน cache ชั่วคราวให้
2. `update(cache, result)` — merge ผลจริงเข้า cache

```ts
useMutation(UPDATE_ITEM, {
  optimisticResponse: {
    __typename: 'Mutation',
    updateItem: {
      __typename: 'Item',
      id,
      title: nextTitle,
    },
  },
  update(cache, { data }) {
    // merge ของจริง
  },
});
```

กับดัก: ต้องมี `__typename` และ `id` ครบ ไม่งั้น normalize ไม่ผูก entity

---

## 4. รวม Redux/NgRx กับ Server State โดยไม่ Duplicate

เป้าหมาย: **Client Store ≠ สำเนาของ API**

| เก็บใน RTK / NgRx                     | เก็บใน RQ / Apollo                  |
| ------------------------------------- | ----------------------------------- |
| selection, expanded rows              | entities / pages จาก API            |
| column visibility, density            | permissions จาก server (หรือ RQ)    |
| wizard step, unsaved draft            | remote documents                    |
| feature flags ที่ override ใน session | remote feature flags (ถ้ามาจาก API) |

ลายเซ็นที่แนะนำ:

```
UI Store ──filters/selection──► queryKey / variables
     ↓
    Server Cache (RQ/Apollo)
     ↓
    components อ่านผ่าน hooks
```

**Anti-pattern:** `useQuery` สำเร็จแล้ว `dispatch(setOrders(data))` เป็นประจำ
ยกเว้นกรณีพิเศษ เช่น ต้องทำ offline write queue ที่ออกแบบมาแล้วอย่างจงใจ

ดูตัวอย่าง: [`examples/02-enterprise-integration/`](./examples/02-enterprise-integration/)

---

## 5. Performance สำหรับ Data Grid ขนาดใหญ่

เมื่อมีหมื่นแถว + columns ไดนามิก:

1. **Selective selectors** — component แถวอ่านแค่ row ที่ตัวเองต้องการ
2. **Memoized selectors** (`createSelector` / `createSelector` จาก reselect ใน RTK)
3. **Normalize แถว** เป็น `ids[]` + `entities{}` ใน client store ถ้าจำเป็นต้อง edit จำนวนมาก offline
4. **Server cache** เก็บ page / window — ไม่ flatten ทั้งโลกเข้า memory ของ UI store
5. **Virtualization** (UI) คู่กับ selective subscription — state ดีอย่างเดียวไม่พอถ้า DOM หนัก

ตัวอย่าง selector ที่แย่:

```ts
useSelector((s) => s); // subscribe ทั้งราก
```

ตัวอย่างที่ดี:

```ts
useSelector((s) => selectRowById(s, rowId));
```

ใน React Query: แยก `select` option เพื่อให้ component re-render เมื่อส่วนที่เลือกเปลี่ยน

```ts
useQuery({
  queryKey,
  queryFn,
  select: (data) => data.items.find((i) => i.id === id),
});
```

---

## 6. Real-time Sync — WebSocket / GraphQL Subscriptions

เป้าหมาย: event จากภายนอก **update cache/store** โดยไม่ต้องให้ user กด refresh

### เข้า React Query

```ts
socket.on('order.updated', (order) => {
  queryClient.setQueryData(['orders', order.id], order);
  queryClient.invalidateQueries({ queryKey: ['orders', 'list'] });
});
```

### เข้า Apollo

```ts
subscribeToMore({
  document: ORDER_UPDATED,
  updateQuery: (prev, { subscriptionData }) => merge(prev, subscriptionData),
});
```

### เข้า Redux/NgRx

ใช้เมื่อ event ส่งผลต่อ **workflow client** (เช่น lock แถว, presence, collaboration cursor)
ไม่ใช่เพื่อ duplicate entity ทั้งก้อนถ้ามี server cache อยู่แล้ว

ดูตัวอย่าง: [`examples/03-realtime-offline-prefetch/`](./examples/03-realtime-offline-prefetch/)

---

## 7. Offline-first และ Cache Prefetching

### Offline-first (แนวคิด)

1. อ่านจาก cache/persistence ก่อน
2. คิว mutation ตอนออฟไลน์
3. sync เมื่อกลับออนไลน์ พร้อม conflict strategy

TanStack มี `persistQueryClient` + storage persister
Apollo มี `apollo3-cache-persist`

ต้องตอบให้ได้ก่อนลง production:

- conflict แก้แบบ last-write-wins หรือต้อง merge?
- ข้อมูล sensitive เก็บใน IndexedDB ได้แค่ไหน?
- TTL ของ persistence?

### Prefetching เพื่อ zero-latency

```ts
// hover ที่เมนู
queryClient.prefetchQuery({
  queryKey: ['product', id],
  queryFn: () => fetchProduct(id),
});
```

กลยุทธ์ที่ใช้บ่อย:

- prefetch หน้ารายละเอียดเมื่อ hover แถว
- prefetch หน้าถัดไปของ pagination
- warm cache หลัง login สำหรับหน้า home

---

## 8. Best Practices สรุประดับ Expert

1. **Optimistic ต้องมี rollback ที่ทดสอบแล้ว** — ไม่ใช่แค่ `setQueryData` ฝั่งสำเร็จ
2. **กำหนด owner ของข้อมูลทุกชนิด** ใน ADR สั้น ๆ ของทีม
3. **Realtime เขียนเข้า cache เจ้าของ** ไม่กระจาย setState ทุกที่
4. **Grid ใหญ่ = selective subscription + virtualization**
5. **Prefetch เท่าที่คุ้ม** — อย่าอุ่น cache ทั้งโลกจนกิน bandwidth
6. **Offline ต้องมี conflict policy** ก่อนเปิด persistence
7. **วัดผล** ด้วย React Profiler / NgRx performance / cache hit rate — ไม่เดา

---

## Checklist จบ Bootcamp

- [ ] Implement optimistic + rollback ได้ทั้ง RQ และ Apollo
- [ ] วาดแผนผัง RTK/NgRx ↔ Server Cache ของ project จริงได้
- [ ] ทำให้ grid re-render เฉพาะแถวที่เปลี่ยน
- [ ] ต่อ websocket แล้ว update cache อย่างมีนโยบาย
- [ ] ออกแบบ prefetch + offline persistence อย่างมีขอบเขต

กลับไปทบทวน [`../01-beginner/`](../01-beginner/) หรือ [`../02-intermediate/`](../02-intermediate/) ได้เสมอเมื่อต้องการ foundation
