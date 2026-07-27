# Level 1 — Beginner: Modern React Core

เป้าหมายระดับนี้: ให้คุณเขียน **React แบบ Functional + TypeScript** ได้ถูกต้อง
โดยเข้าใจ **ทำไม React ออกแบบแบบ Declarative / Immutable** ไม่ใช่แค่ syntax ของ Hooks

---

## สารบัญ

1. [ทำไม Full-stack Dev ต้องเรียน React สมัยใหม่](#1-ทำไม-full-stack-dev-ต้องเรียน-react-สมัยใหม่)
2. [Functional Components & JSX](#2-functional-components--jsx)
3. [Props — สัญญาของ Component](#3-props--สัญญาของ-component)
4. [Immutable State กับ `useState`](#4-immutable-state-กับ-usestate)
5. [Lifecycle ผ่าน Hooks](#5-lifecycle-ผ่าน-hooks)
6. [`useMemo` และ `useCallback` — เมื่อไหร่ควรใช้](#6-usememo-และ-usecallback--เมื่อไหร่ควรใช้)
7. [Context API สำหรับ Global State](#7-context-api-สำหรับ-global-state)
8. [Form Handling + Strict Validation](#8-form-handling--strict-validation)
9. [Best Practices สรุป](#9-best-practices-สรุป)

---

## 1. ทำไม Full-stack Dev ต้องเรียน React สมัยใหม่

React คือ **UI library** ที่แยก “สถานะของแอป” ออกจาก “วิธีวาดหน้าจอ”

| จุดเปรียบเทียบ | DOM แบบ Imperative     | React Declarative                    |
| -------------- | ---------------------- | ------------------------------------ |
| update UI      | `el.textContent = ...` | เปลี่ยน state → React วาดใหม่        |
| Sync ข้อมูล    | ต้องจำว่าแก้ตรงไหนบ้าง | Single source of truth               |
| Composition    | copy-paste HTML        | Component ซ้อนกันเป็นต้นไม้          |
| Tooling        | กระจาย                 | Ecosystem ใหญ่ (Next, testing, a11y) |

สำหรับคนที่เขียน Backend อยู่แล้ว — React จะรู้สึกเหมือน “view layer ที่เป็น pure function ของ state”
หลักการนี้สำคัญมากก่อนเข้าสู่ Next.js เพราะ **RSC ก็ยังยึด composition model เดียวกัน**

---

## 2. Functional Components & JSX

### 2.1 Component คือ function ที่คืน UI

```tsx
type GreetingProps = { name: string };

export function Greeting({ name }: GreetingProps) {
  return <h1>สวัสดี {name}</h1>;
}
```

- ชื่อขึ้นต้นด้วยตัวพิมพ์ใหญ่ (PascalCase) — จำเป็นสำหรับ JSX
- คืนค่าได้แค่ **หนึ่ง root** (หรือ Fragment `<>...</>`)
- ห้าม mutate props — props เป็น read-only

### 2.2 JSX ไม่ใช่ HTML

JSX ถูก transpile เป็น `React.createElement` / JSX runtime:

```tsx
<div className="card" onClick={handleClick}>
  {items.map((item) => (
    <span key={item.id}>{item.label}</span>
  ))}
</div>
```

ความต่างที่พบบ่อย:

| HTML                | JSX                                |
| ------------------- | ---------------------------------- |
| `class`             | `className`                        |
| `for`               | `htmlFor`                          |
| inline style string | object: `style={{ color: "red" }}` |
| comments `<!-- -->` | `{/* comment */}`                  |

**กฎ `key`:** เมื่อ render list ต้องมี `key` ที่ stable (id จากข้อมูล) — อย่าใช้ index ถ้า list เรียงใหม่/ลบได้

---

## 3. Props — สัญญาของ Component

Props คือ **อินพุต** ของ component — ออกแบบให้แคบและชัด

```tsx
type ButtonProps = {
  label: string;
  variant?: 'primary' | 'ghost';
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

export function Button({
  label,
  variant = 'primary',
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button type="button" className={`btn btn-${variant}`} disabled={disabled} onClick={onClick}>
      {children ?? label}
    </button>
  );
}
```

### Best practices ด้าน Props

1. **Destructure** ใน parameter — อ่านง่ายกว่า `props.x`
2. ใช้ **union / discriminated union** แทน `string` หลวม ๆ
3. แยก presentational (รับ props แล้ววาด) กับ container (มี state/effect)
4. หลีกเลี่ยง prop drilling ลึกเกิน 2–3 ชั้น → ใช้ Context หรือ composition (`children`)

---

## 4. Immutable State กับ `useState`

```tsx
const [count, setCount] = useState(0);
const [user, setUser] = useState<{ name: string } | null>(null);
```

### ทำไมต้อง Immutable

React เปรียบเทียบ state รอบถัดไปด้วย **Object.is** (reference สำหรับ object/array)
ถ้าคุณ mutate array เดิมแล้วเรียก `setItems(items)` — React อาจ **ไม่ re-render**

```tsx
// ❌ ผิด — mutate in place
items.push(newItem);
setItems(items);

// ✅ ถูก — สร้าง array ใหม่
setItems([...items, newItem]);

// ✅ object
setUser((prev) => (prev ? { ...prev, name: 'Ada' } : prev));
```

### Functional updates

เมื่อ state ใหม่ขึ้นกับค่าเดิม **ต้อง** ใช้ updater function เพื่อหลีกเลี่ยง stale closure:

```tsx
setCount((c) => c + 1);
```

### Derived state — อย่าเก็บซ้ำ

```tsx
// ❌ เก็บ fullName ทั้งที่คำนวณได้
const [first, setFirst] = useState('');
const [last, setLast] = useState('');
const [fullName, setFullName] = useState(''); // อย่าทำ

// ✅ คำนวณตอน render
const fullName = `${first} ${last}`.trim();
```

---

## 5. Lifecycle ผ่าน Hooks

ใน Class component มี `componentDidMount` / `DidUpdate` / `WillUnmount`
ใน Function component รวมผ่าน **`useEffect`**

```
Mount → Render → Commit → useEffect(run)
Update → Render → Commit → useEffect(cleanup) → useEffect(run)
Unmount → useEffect(cleanup)
```

```tsx
useEffect(() => {
  const controller = new AbortController();

  async function load() {
    const res = await fetch('/api/me', { signal: controller.signal });
    const data = await res.json();
    setUser(data);
  }

  void load();

  return () => controller.abort(); // cleanup เมื่อ unmount / deps เปลี่ยน
}, []); // [] = รันครั้งเดียวหลัง mount
```

### Dependency Array

| deps   | ความหมาย                        |
| ------ | ------------------------------- |
| `[]`   | หลัง mount ครั้งเดียว           |
| `[id]` | ทุกครั้งที่ `id` เปลี่ยน        |
| ไม่ใส่ | ทุก render (เกือบไม่เคยต้องการ) |

**กฎ:** ค่าที่ใช้ใน effect ที่มาจาก props/state ต้องอยู่ใน deps (ESLint `react-hooks/exhaustive-deps`)

### เมื่อไหร่ไม่ควรใช้ `useEffect`

- คำนวณค่าจาก props/state → คำนวณตอน render
- Reset state เมื่อ prop เปลี่ยน → ใช้ `key` บน component
- Sync ไปยัง parent → ยก state ขึ้น (lift state up)

---

## 6. `useMemo` และ `useCallback` — เมื่อไหร่ควรใช้

ทั้งคู่เป็น **optimization hooks** ไม่ใช่ correctness hooks

```tsx
const sorted = useMemo(() => [...items].sort((a, b) => a.name.localeCompare(b.name)), [items]);

const handleSelect = useCallback(
  (id: string) => {
    onSelect(id);
  },
  [onSelect],
);
```

| Hook          | เก็บอะไร        | ใช้เมื่อ                                                     |
| ------------- | --------------- | ------------------------------------------------------------ |
| `useMemo`     | ผลลัพธ์การคำนวณ | คำนวณแพง / ส่ง object ให้ memoized child                     |
| `useCallback` | ตัว function    | ส่ง callback ให้ `React.memo` child หรือเป็น deps ของ effect |

### Anti-patterns

```tsx
// ❌ wrap ทุกอย่าง — ต้นทุน cache อาจแพงกว่าคำนวณใหม่
const x = useMemo(() => a + b, [a, b]);

// ❌ useCallback โดยไม่มี consumer ที่ memo
const noop = useCallback(() => {}, []);
```

**หลักการหลักสูตร:** วัดก่อน (React DevTools Profiler) แล้วค่อย memoize
ใน React 19 + Compiler บางทีมลดการใช้มือลง — แต่ยังต้องเข้าใจกลไก

---

## 7. Context API สำหรับ Global State

Context แก้ **prop drilling** สำหรับข้อมูลที่ “อ่านบ่อย แต่เปลี่ยนไม่บ่อย” เช่น theme, locale, auth session

```tsx
const ThemeContext = createContext<'light' | 'dark'>('light');

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
```

### ข้อควรระวัง

1. เมื่อ `value` เปลี่ยน → **ทุก consumer re-render**
2. อย่าใส่ object ใหม่ทุก render โดยไม่ `useMemo`
3. แยก Context ตาม domain (Auth / UI) ดีกว่า Context ยักษ์เดียว
4. State ที่เปลี่ยนถี่มาก (เช่น keystroke ทุกตัวอักษร) → ไม่เหมาะกับ Context ทั้งแอป

---

## 8. Form Handling + Strict Validation

รูปแบบที่แนะนำในระดับ Beginner:

1. **Controlled inputs** — value มาจาก state
2. Validate ด้วย schema (Zod) ตอน submit + แสดง field errors
3. Disable submit ระหว่าง pending เพื่อกัน double-submit

```tsx
const schema = z.object({
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  password: z.string().min(8, 'อย่างน้อย 8 ตัวอักษร'),
});

type FormValues = z.infer<typeof schema>;
```

### UX ที่ควรมี

- แสดง error ใต้ field ที่ผิด
- โฟกัส field แรกที่ error หลัง submit
- แยก client validation กับ server error message

รายละเอียดเต็มอยู่ใน `examples/03-context-forms`

---

## 9. Best Practices สรุป

| หลักการ | ทำ                        | อย่าทำ                       |
| ------- | ------------------------- | ---------------------------- |
| State   | Immutable update          | `arr.push` แล้ว set ค่าเดิม  |
| Effect  | Cleanup + AbortController | fetch โดยไม่ยกเลิก           |
| Memo    | หลังวัดแล้วมีปัญหา        | wrap ทุก function            |
| Context | Theme / Auth / Locale     | เก็บทุก keystroke            |
| Forms   | Schema validation         | เชื่อแค่ `required` ของ HTML |
| Types   | Props ที่แคบและชัด        | `any` / `props: object`      |

---

## ไฟล์ในระดับนี้

| folder                                                                        | เนื้อหา                                 |
| ----------------------------------------------------------------------------- | --------------------------------------- |
| [`examples/01-components-props-state`](./examples/01-components-props-state/) | Components, Props, Immutable `useState` |
| [`examples/02-hooks-performance`](./examples/02-hooks-performance/)           | `useEffect`, `useMemo`, `useCallback`   |
| [`examples/03-context-forms`](./examples/03-context-forms/)                   | Context API + Zod forms                 |
| [`LAB.md`](./LAB.md)                                                          | โจทย์ Task Board (Context + Validation) |

```bash
cd examples/01-components-props-state && npm install && npm run dev
```

**ถัดไป → [`../02-intermediate/README.md`](../02-intermediate/README.md)** (หลังจากทำ Lab ผ่าน)
