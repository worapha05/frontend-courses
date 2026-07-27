import Link from 'next/link';

export default function HomePage() {

  return (
    <main>
      <h1>Data Fetching Strategies</h1>
      <p style={{ color: '#64748b' }}>
        เปรียบเทียบ SSR / SSG / ISR ผ่าน <code>dynamic</code> / <code>revalidate</code> —
        ข้อมูลมาจาก data layer เดียวกัน (ไม่ fetch กลับ /api ตอน build)
      </p>
      <ul>
        <li>
          <Link href="/ssr">/ssr — cache: &quot;no-store&quot;</Link>
        </li>
        <li>
          <Link href="/ssg">/ssg — force-cache (static)</Link>
        </li>
        <li>
          <Link href="/isr">/isr — revalidate: 10s</Link>
        </li>
      </ul>
    </main>
  );
}
