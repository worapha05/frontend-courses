import type { Order, OrderStatus } from './types';

const orders: Order[] = [
  {
    id: 'ord-1001',
    customer: 'Ada Lovelace',
    total: 3200,
    status: 'paid',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ord-1002',
    customer: 'Alan Turing',
    total: 12900,
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];

export const orderRepo = {
  list(): Order[] {
    return [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  create(input: { customer: string; total: number }): Order {
    const order: Order = {
      id: `ord-${crypto.randomUUID().slice(0, 8)}`,
      customer: input.customer,
      total: input.total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    orders.unshift(order);
    return order;
  },
  updateStatus(id: string, status: OrderStatus): Order | undefined {
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return undefined;
    const updated = { ...orders[idx], status };
    orders[idx] = updated;
    return updated;
  },
};
