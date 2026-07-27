import type { QueryClient } from '@tanstack/react-query';

export async function fetchProduct(id: string) {
  await new Promise((r) => setTimeout(r, 120));
  return { id, name: `สินค้า ${id}`, price: 1000 };
}

/** เรียกตอน hover / focus แถว เพื่อให้คลิกเข้าแล้วเจอ cache */
export function prefetchProduct(queryClient: QueryClient, id: string) {
  return queryClient.prefetchQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    staleTime: 60_000,
  });
}

export function ProductLink({ id, queryClient }: { id: string; queryClient: QueryClient }) {
  return (
    <a
      href={`/products/${id}`}
      onMouseEnter={() => {
        void prefetchProduct(queryClient, id);
      }}
      onFocus={() => {
        void prefetchProduct(queryClient, id);
      }}
    >
      เปิดสินค้า {id}
    </a>
  );
}
