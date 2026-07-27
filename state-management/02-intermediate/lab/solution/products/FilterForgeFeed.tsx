import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { createCatalogProduct, fetchCatalogPage, forgeKeys } from './api';

export function FilterForgeFeed(props: {
  debouncedQ: string;
  category: 'all' | 'books' | 'gadgets';
}) {
  const queryClient = useQueryClient();

  const feed = useInfiniteQuery({
    queryKey: forgeKeys.infinite(props.debouncedQ, props.category),
    queryFn: ({ pageParam, signal }) =>
      fetchCatalogPage({
        q: props.debouncedQ,
        category: props.category,
        page: pageParam,
        signal,
      }),
    initialPageParam: 1,
    getNextPageParam: (last) => last.nextPage ?? undefined,
    staleTime: 20_000,
    gcTime: 15 * 60_000,
    placeholderData: (previousData) => previousData,
  });

  const createMut = useMutation({
    mutationFn: createCatalogProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: forgeKeys.all });
    },
  });

  const items = feed.data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <section>
      <ul>
        {items.map((p) => (
          <li key={p.id}>
            {p.name} · {p.category} · ฿{p.price} · {p.inStock ? 'มีของ' : 'หมด'}
          </li>
        ))}
      </ul>
      <button
        type="button"
        disabled={!feed.hasNextPage || feed.isFetchingNextPage}
        onClick={() => void feed.fetchNextPage()}
      >
        โหลดเพิ่ม
      </button>
      <button
        type="button"
        disabled={createMut.isPending}
        onClick={() =>
          createMut.mutate({
            name: 'New Gadget',
            category: 'gadgets',
            price: 1000,
            inStock: true,
          })
        }
      >
        สร้างสินค้า (invalidate)
      </button>
    </section>
  );
}
