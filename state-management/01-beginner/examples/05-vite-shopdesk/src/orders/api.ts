export type ShopOrder = {
  id: string;
  customer: string;
  total: number;
  status: 'paid' | 'pending';
};

export type OrderStatusFilter = 'all' | 'paid' | 'pending';

const MOCK_ORDERS: ShopOrder[] = [
  { id: 'ORD-1001', customer: 'Ann', total: 1200, status: 'paid' },
  { id: 'ORD-1002', customer: 'Bee', total: 450, status: 'pending' },
  { id: 'ORD-1003', customer: 'Cat', total: 890, status: 'paid' },
  { id: 'ORD-1004', customer: 'Dan', total: 300, status: 'pending' },
  { id: 'ORD-1005', customer: 'Eve', total: 2100, status: 'paid' },
];

export const orderKeys = {
  all: ['orders'] as const,
  list: (status: OrderStatusFilter) => ['orders', { status }] as const,
};

export async function fetchOrders(status: OrderStatusFilter): Promise<ShopOrder[]> {
  await new Promise((r) => setTimeout(r, 280));
  if (status === 'all') return MOCK_ORDERS.map((o) => ({ ...o }));
  return MOCK_ORDERS.filter((o) => o.status === status).map((o) => ({ ...o }));
}
