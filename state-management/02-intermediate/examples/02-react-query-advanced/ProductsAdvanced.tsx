import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { cachePolicies } from './cachePolicies';
import { createProduct, fetchProductPage, productKeys } from './productsApi';

export function ProductPager({ page, pageSize = 10 }: { page: number; pageSize?: number }) {
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: productKeys.page(page, pageSize),
    queryFn: () => fetchProductPage(page, pageSize),
    placeholderData: (previousData) => previousData,
    ...cachePolicies.list,
  });

  if (isPending && !data) return <p>โหลดหน้าแรก…</p>;
  if (isError) return <p>{(error as Error).message}</p>;

  return (
    <section>
      <h2>
        หน้า {data?.page} {isFetching ? '(sync…)' : ''}
      </h2>
      <ul>
        {data?.items.map((p) => (
          <li key={p.id}>
            {p.name} — ฿{p.price}
          </li>
        ))}
      </ul>
      <p>
        ทั้งหมด {data?.total} รายการ · next: {data?.nextPage ?? '—'}
      </p>
    </section>
  );
}

export function ProductInfiniteFeed({ pageSize = 10 }: { pageSize?: number }) {
  const query = useInfiniteQuery({
    queryKey: productKeys.infinite(pageSize),
    queryFn: ({ pageParam }) => fetchProductPage(pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (last) => last.nextPage ?? undefined,
    ...cachePolicies.list,
  });

  if (query.isPending) return <p>โหลด feed…</p>;
  if (query.isError) return <p>{(query.error as Error).message}</p>;

  const items = query.data.pages.flatMap((p) => p.items);

  return (
    <section>
      <ul>
        {items.map((p) => (
          <li key={p.id}>
            {p.name} — ฿{p.price}
          </li>
        ))}
      </ul>
      <button
        type="button"
        disabled={!query.hasNextPage || query.isFetchingNextPage}
        onClick={() => void query.fetchNextPage()}
      >
        {query.isFetchingNextPage ? 'กำลังโหลด…' : 'โหลดเพิ่ม'}
      </button>
    </section>
  );
}

export function CreateProductForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
      // หลังสร้างสำเร็จ — ทำให้ทุก products query กลายเป็น stale และ refetch ถ้า active
      await queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        mutation.mutate({
          name: String(fd.get('name') ?? 'New'),
          price: Number(fd.get('price') ?? 0),
        });
        e.currentTarget.reset();
      }}
    >
      <input name="name" placeholder="ชื่อสินค้า" required />
      <input name="price" type="number" placeholder="ราคา" required />
      <button type="submit" disabled={mutation.isPending}>
        สร้าง
      </button>
      {mutation.isError ? <p>{(mutation.error as Error).message}</p> : null}
    </form>
  );
}
