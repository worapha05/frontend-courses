import type { Todo } from './types';

/** In-memory store — ในโปรดักชันแทนด้วย Prisma/Drizzle */
const todos: Todo[] = [
  {
    id: '1',
    title: 'ตั้งค่า Middleware auth',
    done: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'เขียน Server Action สร้าง todo',
    done: false,
    createdAt: new Date().toISOString(),
  },
];

export const todoRepo = {
  list(): Todo[] {
    return [...todos].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  create(title: string): Todo {
    const todo: Todo = {
      id: crypto.randomUUID(),
      title,
      done: false,
      createdAt: new Date().toISOString(),
    };
    todos.unshift(todo);
    return todo;
  },
  toggle(id: string): Todo | undefined {
    const idx = todos.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    const updated = { ...todos[idx], done: !todos[idx].done };
    todos[idx] = updated;
    return updated;
  },
};
