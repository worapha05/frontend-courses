import Link from 'next/link';
import { posts } from '@/data/posts';

export default function HomePage() {

  return (
    <main>
      <h1>Product Catalog + Blog</h1>
      <p style={{ color: '#64748b' }}>หน้าแรกแบบ static — ลิงก์ไปยัง ISR catalog และ SSG blog</p>
      <h2>บทความ</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/products">ดูสินค้าทั้งหมด →</Link>
      </p>
    </main>
  );
}
