import type { PageServerLoad } from './$types';
import { queryOrders, type OrderStatus } from '$lib/server/orders';

export const load: PageServerLoad = async ({ url }) => {
  const page = Number(url.searchParams.get('page') ?? '1');
  const pageSize = Number(url.searchParams.get('pageSize') ?? '100');
  const status = (url.searchParams.get('status') ?? 'all') as OrderStatus | 'all';
  const q = url.searchParams.get('q') ?? '';

  return queryOrders({ page, pageSize, status, q });
};
