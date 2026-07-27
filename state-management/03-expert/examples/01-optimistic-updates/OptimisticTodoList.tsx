import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export type Todo = { id: string; title: string; done: boolean };

const todoKeys = {
  all: ['todos'] as const,
};

let remoteTodos: Todo[] = [
  { id: '1', title: 'เขียน LAB', done: false },
  { id: '2', title: 'Review PR', done: true },
];

async function fetchTodos(): Promise<Todo[]> {
  await new Promise((r) => setTimeout(r, 200));
  return remoteTodos.map((t) => ({ ...t }));
}

async function toggleTodo(id: string): Promise<Todo> {
  await new Promise((r) => setTimeout(r, 400));
  if (id === 'fail') throw new Error('Server rejected toggle');
  remoteTodos = remoteTodos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  const found = remoteTodos.find((t) => t.id === id);
  if (!found) throw new Error('Not found');
  return { ...found };
}

export function OptimisticTodoList() {
  const queryClient = useQueryClient();
  const { data = [] } = useQuery({ queryKey: todoKeys.all, queryFn: fetchTodos });

  const toggle = useMutation({
    mutationFn: toggleTodo,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.all });
      const previous = queryClient.getQueryData<Todo[]>(todoKeys.all);
      queryClient.setQueryData<Todo[]>(todoKeys.all, (old = []) =>
        old.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
      );
      return { previous };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(todoKeys.all, ctx.previous);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>
          <label>
            <input type="checkbox" checked={todo.done} onChange={() => toggle.mutate(todo.id)} />
            {todo.title}
          </label>
        </li>
      ))}
      {toggle.isError ? <p role="alert">{(toggle.error as Error).message} (rolled back)</p> : null}
    </ul>
  );
}
