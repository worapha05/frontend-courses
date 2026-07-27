export type OrderRow = {
  id: string;
  customer: string;
  total: number;
  status: 'paid' | 'pending' | 'failed';
};

export const ORDERS: OrderRow[] = [
  { id: 'ORD-1001', customer: 'Anya', total: 1290, status: 'paid' },
  { id: 'ORD-1002', customer: 'Ben', total: 540, status: 'pending' },
  { id: 'ORD-1003', customer: 'Chai', total: 3200, status: 'paid' },
  { id: 'ORD-1004', customer: 'Dao', total: 890, status: 'failed' },
  { id: 'ORD-1005', customer: 'Eve', total: 150, status: 'pending' },
];
