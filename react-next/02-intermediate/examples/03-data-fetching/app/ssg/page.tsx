import { getProducts } from '@/lib/products';

/** Static ที่ build / request แรก — cache แน่นผ่าน segment ที่ไม่มี dynamic */
export default async function SsgPage() {
  const data = await getProducts();

  return (
    <main>
      <h1>SSG</h1>
      <p>หน้านี้ถูก prerender ตอน build — ใน production ค่าจะคงที่จนกว่าจะ rebuild</p>
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
