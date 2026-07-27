export type OrderRow = {
  id: string;
  customer: string;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
  amount: number;
  region: string;
  createdAt: string;
};

const STATUSES: OrderRow['status'][] = ['pending', 'paid', 'shipped', 'cancelled'];
const REGIONS = ['BKK', 'CNX', 'KKU', 'HKT', 'HDY'];
const NAMES = ['Ann', 'Bee', 'Chris', 'Dew', 'Eve', 'Finn', 'Gin', 'Hana'];

export function generateOrders(count = 2500): OrderRow[] {
  const rows: OrderRow[] = [];
  for (let i = 1; i <= count; i++) {
    rows.push({
      id: `ORD-${String(i).padStart(5, '0')}`,
      customer: NAMES[i % NAMES.length],
      status: STATUSES[i % STATUSES.length],
      amount: Math.round((50 + (i % 97) * 13.7) * 100) / 100,
      region: REGIONS[i % REGIONS.length],
      createdAt: new Date(Date.UTC(2026, i % 12, (i % 28) + 1)).toISOString().slice(0, 10),
    });
  }
  return rows;
}
