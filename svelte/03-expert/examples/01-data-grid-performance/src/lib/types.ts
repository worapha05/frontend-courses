export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'cancelled';

export type Order = {
  id: string;
  customer: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
};
