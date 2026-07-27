export type CatalogProduct = {
  id: string;
  name: string;
  category: 'books' | 'gadgets';
  price: number;
  inStock: boolean;
};

export type ProductPage = {
  items: CatalogProduct[];
  page: number;
  nextPage: number | null;
};

const DB: CatalogProduct[] = [
  { id: '1', name: 'MacBook Guide', category: 'books', price: 450, inStock: true },
  { id: '2', name: 'Mechanical Keyboard', category: 'gadgets', price: 3200, inStock: true },
  { id: '3', name: 'USB-C Hub', category: 'gadgets', price: 990, inStock: false },
  { id: '4', name: 'Clean Code', category: 'books', price: 650, inStock: true },
  { id: '5', name: 'Webcam HD', category: 'gadgets', price: 1500, inStock: true },
  { id: '6', name: 'Design Patterns', category: 'books', price: 700, inStock: true },
  { id: '7', name: 'Noise Cancelling Buds', category: 'gadgets', price: 4200, inStock: true },
  { id: '8', name: 'TypeScript Handbook', category: 'books', price: 500, inStock: true },
];

export const forgeKeys = {
  all: ['filter-forge'] as const,
  infinite: (q: string, category: string) => ['filter-forge', 'infinite', { q, category }] as const,
};

export async function fetchCatalogPage(input: {
  q: string;
  category: 'all' | 'books' | 'gadgets';
  page: number;
  pageSize?: number;
  signal?: AbortSignal;
}): Promise<ProductPage> {
  const pageSize = input.pageSize ?? 3;
  await new Promise((r, reject) => {
    const t = setTimeout(r, 180);
    input.signal?.addEventListener('abort', () => {
      clearTimeout(t);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });

  let rows = DB.slice();
  if (input.category !== 'all') {
    rows = rows.filter((p) => p.category === input.category);
  }
  const q = input.q.trim().toLowerCase();
  if (q) {
    rows = rows.filter((p) => p.name.toLowerCase().includes(q));
  }

  const start = (input.page - 1) * pageSize;
  const items = rows.slice(start, start + pageSize);
  const nextPage = start + pageSize < rows.length ? input.page + 1 : null;
  return { items, page: input.page, nextPage };
}

export async function createCatalogProduct(
  input: Omit<CatalogProduct, 'id'>,
): Promise<CatalogProduct> {
  await new Promise((r) => setTimeout(r, 200));
  const product: CatalogProduct = { id: String(Date.now()), ...input };
  DB.unshift(product);
  return product;
}
