import { getProducts } from '@/lib/products';

export const revalidate = 10;

export default async function IsrPage() {
  const data = await getProducts();

  return (
    <main>
      <h1>ISR</h1>
      <p>
        Revalidate ทุก 10 วินาที — รีเฟรชถี่ ๆ จะเห็นค่าเดิม แล้วค่อยอัปเดตหลัง ช่วงเวลา (ทดสอบด้วย{' '}
        <code>npm run build && npm start</code>)
      </p>
      <p>
        <strong>{data.fetchedAt}</strong>
      </p>
      <ul>
        {data.products.map((p) => (
          <li key={p.id}>
            {p.name} · nonce {p.viewNonce}
          </li>
        ))}
      </ul>
    </main>
  );
}
