import { cachedEventHandler } from 'nitropack/runtime';
import { generateOrders } from '../../utils/orders';
import { requireRole, assertPositiveInt } from '../../utils/auth';
import { safeUpstream } from '../../utils/http';

export default cachedEventHandler(
  async (event) => {
    requireRole(event, ['admin']);

    const days = assertPositiveInt(getQuery(event).days ?? 7, 'days');

    return await safeUpstream(async () => {
      // จำลอง upstream latency
      await new Promise((r) => setTimeout(r, 150));
      const orders = generateOrders(2500);
      const paid = orders.filter((o) => o.status === 'paid' || o.status === 'shipped');
      const revenue = paid.reduce((s, o) => s + o.amount, 0);

      return {
        rangeDays: days,
        generatedAt: new Date().toISOString(),
        totals: {
          orders: orders.length,
          paidOrShipped: paid.length,
          revenue: Math.round(revenue * 100) / 100,
        },
        byRegion: Object.fromEntries(
          ['BKK', 'CNX', 'KKU', 'HKT', 'HDY'].map((region) => [
            region,
            orders.filter((o) => o.region === region).length,
          ]),
        ),
      };
    }, 'Failed to build admin report');
  },
  {
    maxAge: 15,
    name: 'admin-report',
    getKey: (event) => {
      const days = String(getQuery(event).days ?? 7);
      const role = getHeader(event, 'x-demo-role') ?? 'anon';
      return `${role}:${days}`;
    },
  },
);
