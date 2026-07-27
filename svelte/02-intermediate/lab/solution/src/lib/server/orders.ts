export type OrderItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
};

export type Order = {
  id: string;
  name: string;
  email: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
};

const orders: Order[] = [];

export function placeOrder(input: { name: string; email: string; items: OrderItem[] }): Order {
  const total = input.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const order: Order = {
    id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    items: input.items,
    total,
    createdAt: new Date().toISOString(),
  };
  orders.unshift(order);
  return order;
}

export function listOrders(): Order[] {
  return [...orders];
}
