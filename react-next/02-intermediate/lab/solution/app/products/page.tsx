import Link from 'next/link';
import { WishlistButton } from '@/components/WishlistButton';
import { fetchProducts } from '@/lib/api';

export const revalidate = 30;

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <main>
      <h1>สินค้า (ISR 30s)</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((p) => (
          <li
            key={p.id}
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: '1rem',
              marginBottom: '0.75rem',
              display: 'grid',
              gap: '0.5rem',
            }}
          >
            <Link href={`/products/${p.id}`} style={{ fontWeight: 700 }}>
              {p.name}
            </Link>
            <span>
              {p.price.toLocaleString('th-TH')} บาท · stock {p.stock}
            </span>
            <WishlistButton productId={p.id} productName={p.name} />
          </li>
        ))}
      </ul>
    </main>
  );
}
