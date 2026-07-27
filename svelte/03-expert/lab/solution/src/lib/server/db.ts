/**
 * Mock ORM — Prisma-style repository surface for the lab.
 * Swap this module for a real Prisma client later without rewriting routes.
 */

import type { Order, OrderStatus, SalesSummary } from '$lib/types';
import { cached } from '$lib/server/cache';

const STATUSES: OrderStatus[] = ['pending', 'paid', 'shipped', 'cancelled'];
const CUSTOMERS = ['Anya', 'Boon', 'Chai', 'Dao', 'Ekk', 'Fah', 'Gin', 'Hana', 'Ira', 'Jai'];

function buildOrders(count = 4000): Order[] {
  const orders: Order[] = [];
  const base = Date.UTC(2026, 0, 1);
  for (let i = 1; i <= count; i++) {
    orders.push({
      id: `ORD-${String(i).padStart(5, '0')}`,
      customer: `${CUSTOMERS[i % CUSTOMERS.length]} ${((i * 7) % 90) + 10}`,
      status: STATUSES[i % STATUSES.length],
      total: Math.round(((i * 41) % 8500) + 120 + (i % 80) * 0.5),
      createdAt: new Date(base + i * 2_700_000).toISOString(),
    });
  }
  return orders;
}

const ORDERS = buildOrders(4000);

export type OrderWhere = {
  status?: OrderStatus | 'all';
  q?: string;
};

function applyWhere(where?: OrderWhere): Order[] {
  let rows = ORDERS;
  if (where?.status && where.status !== 'all') {
    rows = rows.filter((o) => o.status === where.status);
  }
  const q = (where?.q ?? '').trim().toLowerCase();
  if (q) {
    rows = rows.filter(
      (o) => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q),
    );
  }
  return rows;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function computeSalesSummary(): Promise<Omit<SalesSummary, 'cacheHit'>> {
  // จำลอง query aggregate ที่แพง
  await sleep(350);

  const byStatus: Record<OrderStatus, number> = {
    pending: 0,
    paid: 0,
    shipped: 0,
    cancelled: 0,
  };
  let revenue = 0;
  for (const o of ORDERS) {
    byStatus[o.status] += 1;
    if (o.status !== 'cancelled') revenue += o.total;
  }

  return {
    orderCount: ORDERS.length,
    revenue,
    byStatus,
    // ISO จาก “DB layer” — แสดงตรง ๆ ได้โดยไม่ format คนละแบบ SSR/CSR
    computedAt: new Date().toISOString(),
  };
}

export const db = {
  order: {
    async findMany(args?: { where?: OrderWhere; skip?: number; take?: number }): Promise<Order[]> {
      const rows = applyWhere(args?.where);
      const skip = args?.skip ?? 0;
      const take = args?.take ?? 50;
      return rows.slice(skip, skip + take);
    },
    async count(args?: { where?: OrderWhere }): Promise<number> {
      return applyWhere(args?.where).length;
    },
  },
  report: {
    /** รายงานแพง — ห่อด้วย TTL cache */
    async salesSummary(): Promise<SalesSummary> {
      const { value, cacheHit } = await cached('sales-summary:v1', 15_000, computeSalesSummary);
      return { ...value, cacheHit };
    },
  },
};
