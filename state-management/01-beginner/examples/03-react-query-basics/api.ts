export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

/** mock / จริงก็ได้ — โครงสร้าง queryFn สำคัญกว่า */
export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  if (!res.ok) {
    throw new Error(`Failed to fetch todos: ${res.status}`);
  }
  return res.json() as Promise<Todo[]>;
}

export async function fetchTodoById(id: number): Promise<Todo> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!res.ok) {
    throw new Error(`Todo ${id} not found`);
  }
  return res.json() as Promise<Todo>;
}

export const todoKeys = {
  all: ['todos'] as const,
  detail: (id: number) => ['todos', id] as const,
};
