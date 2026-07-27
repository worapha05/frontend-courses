export type Role = 'user' | 'editor' | 'admin';

export type SessionUser = {
  id: string;
  username: string;
  role: Role;
};

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'cancelled';

export type Order = {
  id: string;
  customer: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
};

export type SalesSummary = {
  orderCount: number;
  revenue: number;
  byStatus: Record<OrderStatus, number>;
  computedAt: string;
  cacheHit: boolean;
};
