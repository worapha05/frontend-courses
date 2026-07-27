import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DashboardGrid } from '@/components/DashboardGrid';
import { TodoPanel } from '@/components/TodoPanel';
import { todoRepo } from '@/lib/todoRepo';

export default async function DashboardPage() {
  const jar = await cookies();
  if (!jar.get('session')) {
    redirect('/login');
  }

  const todos = todoRepo.list();

  async function logout() {
    'use server';
    const c = await cookies();
    c.delete('session');
    redirect('/login');
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Ops Dashboard</h1>
          <p className="text-sm text-slate-600">Responsive grid + Server Actions</p>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-md bg-slate-700 px-3 py-1.5 text-sm font-semibold text-white"
          >
            Logout
          </button>
        </form>
      </div>

      <DashboardGrid
        stats={[
          { label: 'Open todos', value: String(todos.filter((t) => !t.done).length) },
          { label: 'Done', value: String(todos.filter((t) => t.done).length) },
          { label: 'API', value: '/api/todos' },
          { label: 'Auth', value: 'cookie session' },
        ]}
      />

      <TodoPanel todos={todos} />
    </main>
  );
}
