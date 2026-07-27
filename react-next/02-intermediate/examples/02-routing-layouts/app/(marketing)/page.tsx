import Link from 'next/link';

export default function HomePage() {

  return (
    <main>
      <h1>File-based Routing</h1>
      <ul>
        <li>
          <Link href="/about">/about — อยู่ใน (marketing)</Link>
        </li>
        <li>
          <Link href="/dashboard">/dashboard — layout คนละชุด</Link>
        </li>
        <li>
          <Link href="/products/sku-42">/products/[id]</Link>
        </li>
        <li>
          <Link href="/api/hello">/api/hello — Route Handler</Link>
        </li>
      </ul>
    </main>
  );
}
