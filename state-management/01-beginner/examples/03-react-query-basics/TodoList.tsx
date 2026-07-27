import { useQuery } from '@tanstack/react-query';

import { fetchTodoById, fetchTodos, todoKeys } from './api';

export function TodoList() {
  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: todoKeys.all,
    queryFn: fetchTodos,
  });

  if (isPending) return <p>กำลังโหลดรายการ…</p>;
  if (isError) return <p>ผิดพลาด: {(error as Error).message}</p>;

  return (
    <section>
      <h2>Todos {isFetching ? '(กำลัง sync…)' : ''}</h2>
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>
            {todo.completed ? '✅' : '⬜️'} {todo.title}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TodoDetail({ id }: { id: number }) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: () => fetchTodoById(id),
    enabled: id > 0, // ไม่ยิงถ้ายังไม่มี id ที่ valid
  });

  if (isPending) return <p>โหลดรายละเอียด…</p>;
  if (isError) return <p>{(error as Error).message}</p>;

  return (
    <article>
      <h3>#{data.id}</h3>
      <p>{data.title}</p>
      <p>สถานะ: {data.completed ? 'เสร็จแล้ว' : 'ยังไม่เสร็จ'}</p>
    </article>
  );
}
