'use client';

import { updateOrderStatusAction } from '@/lib/actions';
import type { Order, OrderStatus } from '@/lib/types';
import { useUiStore } from '@/store/uiStore';

const STATUSES: OrderStatus[] = ['pending', 'paid', 'shipped', 'cancelled'];

export function OrdersTable({ orders }: { orders: Order[] }) {
  const denseMode = useUiStore((s) => s.denseMode);
  const cell = denseMode ? 'px-2 py-1.5' : 'px-4 py-3';

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className={cell}>ID</th>
            <th className={cell}>Customer</th>
            <th className={cell}>Total</th>
            <th className={cell}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-slate-100">
              <td className={`${cell} font-mono text-xs`}>{order.id}</td>
              <td className={cell}>{order.customer}</td>
              <td className={cell}>{order.total.toLocaleString('th-TH')}</td>
              <td className={cell}>
                <select
                  defaultValue={order.status}
                  onChange={(e) => {
                    void updateOrderStatusAction(order.id, e.target.value as OrderStatus);
                  }}
                  className="rounded border border-slate-300 bg-white px-2 py-1"
                  aria-label={`สถานะออเดอร์ ${order.id}`}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
