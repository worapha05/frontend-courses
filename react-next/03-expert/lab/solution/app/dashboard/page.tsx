import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CreateOrderForm } from '@/components/CreateOrderForm';
import { KpiGrid } from '@/components/KpiGrid';
import { OrdersTable } from '@/components/OrdersTable';
import { UiControls } from '@/components/UiControls';
import { orderRepo } from '@/lib/orderRepo';

export default async function DashboardPage() {
  const jar = await cookies();
  if (!jar.get('session')) redirect('/login');

  const orders = orderRepo.list();
  const revenue = orders
    .filter((o) => o.status === 'paid' || o.status === 'shipped')
    .reduce((sum, o) => sum + o.total, 0);

  async function logout() {
    'use server';
    const c = await cookies();
    c.delete('session');
    redirect('/login');
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-53px)] max-w-6xl gap-4 px-4 py-6">
      <UiControls logoutAction={logout} />

      <main className="min-w-0 flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Orders Overview</h1>
          <p className="text-sm text-slate-600">
            KPI · Server Actions · Repository · Zustand dense mode
          </p>
        </div>

        <KpiGrid
          items={[
            { label: 'Orders', value: String(orders.length) },
            {
              label: 'Pending',
              value: String(orders.filter((o) => o.status === 'pending').length),
            },
            {
              label: 'Shipped',
              value: String(orders.filter((o) => o.status === 'shipped').length),
            },
            {
              label: 'Revenue',
              value: `${revenue.toLocaleString('th-TH')} ฿`,
            },
          ]}
        />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="xl:col-span-1">
            <CreateOrderForm />
          </div>
          <div className="xl:col-span-2">
            <OrdersTable orders={orders} />
          </div>
        </div>
      </main>
    </div>
  );
}
