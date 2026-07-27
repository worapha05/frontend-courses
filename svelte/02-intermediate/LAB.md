# Lab — Intermediate: ร้านหนังสือออนไลน์ (SvelteKit)

## เป้าหมาย

สร้าง **Bookshop** ขนาดเล็กด้วย Svelte 5 + SvelteKit + TypeScript
ฝึกเชื่อม **custom store (ตะกร้า)**, **server `load`**, **Form Actions + `use:enhance`**, และ **transitions** ในแอปเดียวกัน

เมื่อทำจบ คุณควร:

- แยกข้อมูลหนังสือไว้ใน `$lib/server` แล้วโหลดผ่าน `+page.server.ts`
- ใช้ custom cart store ข้ามหน้า `/books/[id]` → `/cart` → `/checkout`
- เขียน Form Action ที่ `fail()` เมื่อ name/email ไม่ผ่าน
- ใส่ transition ให้ toast หรือรายการในตะกร้าอย่างมีจุดประสงค์

---

## โจทย์

สร้างแอปที่รองรับ:

| feature         | คำอธิบาย                                                      |
| --------------- | ------------------------------------------------------------- |
| Layout + nav    | link **หน้าแรก / หนังสือ / ตะกร้า** (แนะนำมีชำระเงินด้วย)     |
| รายการหนังสือ   | `/books` โหลดจาก mock DB ฝั่ง server                          |
| รายละเอียด      | `/books/[id]` แสดงเล่มเดียว · `error(404)` ถ้าไม่พบ           |
| ตะกร้า (client) | custom `writable` store · เพิ่มจากหน้า detail ได้             |
| Checkout        | Form Action ตรวจ `name` + `email` แล้ว “วางออเดอร์” ใน memory |
| Transitions     | toast ตอนเพิ่มตะกร้า **หรือ** fly/fade บนรายการตะกร้า         |
| TypeScript      | ใช้ `lang="ts"` ทั้งไฟล์สำคัญ                                 |

### โครงข้อมูลแนะนำ

```ts
type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  category: string;
};

type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
};
```

### โครงสร้างที่คาดหวัง

```
lab/solution/
 package.json
 svelte.config.js
 vite.config.ts
 tsconfig.json
 .gitignore
 src/
 app.html
 app.d.ts
 app.css
 lib/
 server/
 books.ts # mock DB
 orders.ts # in-memory orders
 stores/
 cart.ts # custom cart store
 toast.ts # (optional) toast store
 routes/
 +layout.svelte
 +page.svelte  # หน้าแรก
 books/
 +page.svelte
 +page.server.ts
 [id]/
  +page.svelte
  +page.server.ts
 cart/
 +page.svelte
 checkout/
 +page.svelte
 +page.server.ts  # actions.place
```

### ข้อกำหนดบังคับ

1. ใช้ **Svelte 5 runes** ใน `.svelte` (`$state`, `$derived`, `$props`)
2. Event ใช้ `onclick=` — **ห้าม** `on:click`
3. form checkout ใช้ `use:enhance`
4. ข้อมูลหนังสืออยู่ใน `$lib/server` — **ห้าม** import เข้า client module โดยตรงเพื่อ “อ่าน DB”
5. Validation ล้มเหลวต้องใช้ `fail(400, …)`
6. สไตล์โทน **slate / teal / warm ink** — ห้ามธีมม่วง

---

## เกณฑ์ผ่าน

- [ ] เปิด `/books` แล้วเห็นรายการจาก server load
- [ ] เปิด `/books/<id>` แล้วเพิ่มลงตะกร้าได้
- [ ] `/cart` แสดงรายการ + แก้จำนวน / ลบได้
- [ ] `/checkout` สั่งซื้อสำเร็จเมื่อกรอก name+email ถูกต้อง
- [ ] กรอกไม่ครบแล้วเห็นข้อความจาก `fail`
- [ ] มี transition อย่างน้อย 1 จุด (toast หรือ cart lines)
- [ ] TypeScript ครบใน stores / server modules / pages หลัก

---

## คำใบ้

- Cart store ทำแบบ `createCart()` คืน `{ subscribe, add, remove, setQty, clear }`
- ส่งรายการตะกร้าเข้า Form Action ผ่าน `<input type="hidden" name="items" value={JSON.stringify($cart)} />`
- ใน `enhance` callback ถ้า `result.type === 'success'` ให้ `cart.clear()`
- Toast: store เล็ก ๆ + `in:fly` / `out:fade` ใน `+layout.svelte`

---

## วิธีรัน

```bash
cd lab/solution
npm install
npm run dev
```

ตัวอย่างประกอบบทเรียนอื่น:

```bash
cd examples/01-stores-context && npm install && npm run dev
cd examples/02-lifecycle-transitions && npm install && npm run dev
cd examples/03-sveltekit-routing-load && npm install && npm run dev
cd examples/04-form-actions && npm install && npm run dev
```

---

## เฉลย

ดูโค้ดเต็มใน [`lab/solution/`](./lab/solution/)

### สรุปไฟล์สำคัญในเฉลย

| ไฟล์                                | บทบาท                                                   |
| ----------------------------------- | ------------------------------------------------------- |
| `lib/server/books.ts`               | mock DB หนังสือ + `listBooks` / `getBook`               |
| `lib/server/orders.ts`              | เก็บออเดอร์ในหน่วยความจำด้วย `placeOrder`               |
| `lib/stores/cart.ts`                | custom cart store สำหรับ client                         |
| `lib/stores/toast.ts`               | คิว toast สั้น ๆ หลังเพิ่มตะกร้า                        |
| `routes/+layout.svelte`             | nav + badge จำนวนชิ้น + เรนเดอร์ toast พร้อม transition |
| `routes/books/+page.server.ts`      | `load` รายการหนังสือ                                    |
| `routes/books/[id]/+page.server.ts` | `load` เล่มเดียว หรือ `error(404)`                      |
| `routes/books/[id]/+page.svelte`    | ปุ่มเพิ่มตะกร้า + เรียก `toasts.push`                   |
| `routes/cart/+page.svelte`          | แสดง `$cart` พร้อม `fly` / `fade` / `flip`              |
| `routes/checkout/+page.server.ts`   | action `place` + `fail` validation                      |
| `routes/checkout/+page.svelte`      | form `use:enhance` ส่ง items เป็น JSON                  |

### จุดที่ควรอ่านในเฉลย

#### 1) Custom cart store

```ts
// src/lib/stores/cart.ts (ย่อ)
function createCart() {
  const { subscribe, update, set } = writable<CartItem[]>([]);
  return {
    subscribe,
    add(book) {
      update((items) => {
        const found = items.find((i) => i.id === book.id);
        if (found) {
          return items.map((i) => (i.id === book.id ? { ...i, qty: i.qty + 1 } : i));
        }
        return [...items, { ...book, qty: 1 }];
      });
    },
    clear: () => set([]),
  };
}
```

ในหน้า detail เรียก `cart.add(...)` แล้ว auto-subscribe ด้วย `$cart` ที่ layout / cart / checkout

#### 2) Server load + 404

```ts
// src/routes/books/[id]/+page.server.ts
export const load: PageServerLoad = async ({ params }) => {
  const book = getBook(params.id);
  if (!book) error(404, 'ไม่พบหนังสือเล่มนี้');
  return { book };
};
```

#### 3) Checkout Form Action

```ts
// actions.place — ตรวจ name/email/items แล้ว fail หรือ placeOrder
if (!name) errors.name = 'กรุณากรอกชื่อ';
if (!email) errors.email = 'กรุณากรอกอีเมล';
// ...
if (errors.name || errors.email || errors.items) {
  return fail(400, { name, email, errors });
}
```

ฝั่ง UI ส่งตะกร้าผ่าน hidden field แล้วเคลียร์ store เมื่อสำเร็จ:

```svelte
<form
  method="POST"
  action="?/place"
  use:enhance={() => {
    return async ({ result, update }) => {
      await update();
      if (result.type === 'success') cart.clear();
    };
  }}
>
  <input type="hidden" name="items" value={itemsJson} />
  ...
</form>
```

#### 4) Transitions

- **Toast** ใน layout: `in:fly` / `out:fade` เมื่อเพิ่มหนังสือ
- **Cart lines**: `in:fly` + `out:fade` + `animate:flip` ตอนเปลี่ยนจำนวน/ลบ

ถ้าติด ให้เทียบไฟล์ใน `lab/solution/src/` ตามลำดับ: `books.ts` → `cart.ts` → routes `books` → `cart` → `checkout`
