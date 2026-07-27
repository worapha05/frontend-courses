export type PulseOrder = {
  id: string;
  customer: string;
  total: number;
  status: 'open' | 'packed' | 'cancelled';
};

let ORDERS: PulseOrder[] = [
  { id: 'A-100', customer: 'Ann', total: 900, status: 'open' },
  { id: 'A-101', customer: 'Bee', total: 400, status: 'open' },
  { id: 'A-102-FAIL', customer: 'Cat', total: 700, status: 'open' },
  { id: 'A-103', customer: 'Dan', total: 1500, status: 'packed' },
];

export const pulseKeys = {
  all: ['pulse-orders'] as const,
  list: ['pulse-orders', 'list'] as const,
  detail: (id: string) => ['pulse-orders', 'detail', id] as const,
};

export async function fetchPulseOrders(): Promise<PulseOrder[]> {
  await new Promise((r) => setTimeout(r, 150));
  return ORDERS.map((o) => ({ ...o }));
}

export async function fetchPulseOrder(id: string): Promise<PulseOrder> {
  await new Promise((r) => setTimeout(r, 120));
  const found = ORDERS.find((o) => o.id === id);
  if (!found) throw new Error('Order not found');
  return { ...found };
}

export async function packOrder(id: string): Promise<PulseOrder> {
  await new Promise((r) => setTimeout(r, 500));
  if (id.endsWith('-FAIL')) {
    throw new Error('Pack rejected by warehouse rules');
  }
  ORDERS = ORDERS.map((o) => (o.id === id ? { ...o, status: 'packed' } : o));
  const found = ORDERS.find((o) => o.id === id);
  if (!found) throw new Error('Order not found');
  return { ...found };
}

/** ให้ mock socket เรียกเพื่อจำลองคนอื่น update */
export function applyRemoteOrderPatch(order: PulseOrder) {
  ORDERS = ORDERS.map((o) => (o.id === order.id ? { ...order } : o));
  if (!ORDERS.some((o) => o.id === order.id)) {
    ORDERS = [order, ...ORDERS];
  }
}
