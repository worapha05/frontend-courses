export type Product = {
  id: string;
  name: string;
  price: number;
};

export type PageResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  nextPage: number | null;
};

const ALL: Product[] = Array.from({ length: 37 }, (_, i) => ({
  id: `P-${i + 1}`,
  name: `สินค้า ${i + 1}`,
  price: 100 + i * 10,
}));

export const productKeys = {
  all: ['products'] as const,
  page: (page: number, pageSize: number) => ['products', 'page', { page, pageSize }] as const,
  infinite: (pageSize: number) => ['products', 'infinite', { pageSize }] as const,
};

export async function fetchProductPage(
  page: number,
  pageSize: number,
): Promise<PageResult<Product>> {
  await new Promise((r) => setTimeout(r, 150));
  const start = (page - 1) * pageSize;
  const items = ALL.slice(start, start + pageSize);
  const total = ALL.length;
  const nextPage = start + pageSize < total ? page + 1 : null;
  return { items, page, pageSize, total, nextPage };
}

export async function createProduct(input: Omit<Product, 'id'>): Promise<Product> {
  await new Promise((r) => setTimeout(r, 200));
  const product: Product = { id: `P-${Date.now()}`, ...input };
  ALL.unshift(product);
  return product;
}
