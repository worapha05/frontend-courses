import { createTodoAction, toggleTodoAction } from '@/lib/actions';
import type { Todo } from '@/lib/types';

export function TodoPanel({ todos }: { todos: Todo[] }) {

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-5">
      <form
        action={createTodoAction}
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2"
      >
        <h2 className="font-bold">สร้าง Todo (Server Action)</h2>
        <label className="mt-3 block text-sm font-medium" htmlFor="title">
          ชื่อเรื่อง
        </label>
        <input
          id="title"
          name="title"
          required
          minLength={3}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          placeholder="อย่างน้อย 3 ตัวอักษร"
        />
        <button
          type="submit"
          className="mt-3 rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
        >
          บันทึก
        </button>
      </form>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-3">
        <h2 className="font-bold">รายการ</h2>
        <ul className="mt-3 divide-y divide-slate-100">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between gap-3 py-2">
              <span className={todo.done ? 'text-slate-400 line-through' : ''}>{todo.title}</span>
              <form
                action={async () => {
                  'use server';
                  await toggleTodoAction(todo.id);
                }}
              >
                <button
                  type="submit"
                  className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold"
                >
                  {todo.done ? 'Undo' : 'Done'}
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
