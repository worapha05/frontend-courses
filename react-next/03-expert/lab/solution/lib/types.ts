export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'cancelled';

export type Order = {
  id: string;
  customer: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
};
