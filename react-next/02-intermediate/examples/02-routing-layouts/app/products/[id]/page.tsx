import { notFound } from 'next/navigation';

const PRODUCTS: Record<string, { name: string; price: number }> = {
  'sku-42': { name: 'Mechanical Keyboard', price: 3200 },
  'sku-7': { name: 'USB-C Hub', price: 1500 },
};

type Props = { params: Promise<{ id: string }> };

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS[id];
  if (!product) notFound();

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>{product.name}</h1>
      <p>SKU: {id}</p>
      <p>ราคา: {product.price.toLocaleString('th-TH')} บาท</p>
    </main>
  );
}
