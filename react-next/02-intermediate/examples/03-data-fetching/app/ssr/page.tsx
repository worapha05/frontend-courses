import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function SsrPage() {
  // no-store เทียบเท่า: หน้านี้ dynamic ทุก request
  const data = await getProducts();

  return (
    <main>
      <h1>SSR</h1>
      <p>
        ดึงใหม่ทุก request — <code>fetchedAt</code> จะเปลี่ยนเมื่อรีเฟรช
      </p>
      <p>
        <strong>{data.fetchedAt}</strong>
      </p>
      <ul>
        {data.products.map((p) => (
          <li key={p.id}>
            {p.name} · stock {p.stock} · nonce {p.viewNonce}
          </li>
        ))}
      </ul>
    </main>
  );
}
