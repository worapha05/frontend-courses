import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { OrderStatus } from '$lib/types';

export const load: PageServerLoad = async ({ url, locals }) => {
  const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
  const pageSize = Math.min(150, Math.max(20, Number(url.searchParams.get('pageSize') ?? '80')));
  const status = (url.searchParams.get('status') ?? 'all') as OrderStatus | 'all';
  const q = url.searchParams.get('q') ?? '';

  const where = { status, q };
  const total = await db.order.count({ where });
  const items = await db.order.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    items,
    total,
    page,
    pageSize,
    pageCount: Math.max(1, Math.ceil(total / pageSize)),
    status,
    q,
    user: locals.user,
  };
};
