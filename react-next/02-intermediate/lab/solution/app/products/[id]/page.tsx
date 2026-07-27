import { notFound } from 'next/navigation';
import { WishlistButton } from '@/components/WishlistButton';
import { fetchProduct } from '@/lib/api';

type Props = { params: Promise<{ id: string }> };

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await fetchProduct(id);
  if (!product) notFound();

  return (
    <main>
      <h1>{product.name}</h1>
      <p>SSR — stock แบบสดทุก request</p>
      <p>
        ราคา {product.price.toLocaleString('th-TH')} บาท · คงเหลือ <strong>{product.stock}</strong>
      </p>
      <WishlistButton productId={product.id} productName={product.name} />
    </main>
  );
}
