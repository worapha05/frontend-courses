import type { Order, OrderStatus } from '$lib/types';

export type { Order, OrderStatus };

const STATUSES: OrderStatus[] = ['pending', 'paid', 'shipped', 'cancelled'];
const CUSTOMERS = ['Anya', 'Boon', 'Chai', 'Dao', 'Ekk', 'Fah', 'Gin', 'Hana', 'Ira', 'Jai'];

/** สร้าง ~5,000 ออเดอร์จำลอง — deterministic เพื่อ hydrate ได้สม่ำเสมอ */
function buildOrders(count = 5000): Order[] {
  const orders: Order[] = [];
  const base = Date.UTC(2026, 0, 1);

  for (let i = 1; i <= count; i++) {
    const status = STATUSES[i % STATUSES.length];
    const customer = CUSTOMERS[i % CUSTOMERS.length];
    orders.push({
      id: `ORD-${String(i).padStart(5, '0')}`,
      customer: `${customer} ${((i * 7) % 90) + 10}`,
      status,
      total: Math.round(((i * 37) % 9000) + 100 + (i % 100) * 0.5),
      createdAt: new Date(base + i * 3_600_000).toISOString(),
    });
  }

  return orders;
}

export const ALL_ORDERS = buildOrders(5000);

export type OrderQuery = {
  page?: number;
  pageSize?: number;
  status?: OrderStatus | 'all';
  q?: string;
};

export function queryOrders(params: OrderQuery) {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.min(200, Math.max(10, params.pageSize ?? 50));
  const status = params.status ?? 'all';
  const q = (params.q ?? '').trim().toLowerCase();

  let filtered = ALL_ORDERS;

  if (status !== 'all') {
    filtered = filtered.filter((o) => o.status === status);
  }

  if (q) {
    filtered = filtered.filter(
      (o) => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q),
    );
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return {
    items,
    total,
    page,
    pageSize,
    pageCount: Math.max(1, Math.ceil(total / pageSize)),
    status,
    q: params.q ?? '',
  };
}
