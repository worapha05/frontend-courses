import { LikeButton } from '@/components/LikeButton';
import { getServerPosts } from '@/lib/posts';

/** Server Component — ดึงข้อมูลบน server โดยไม่มี useEffect */
export default async function HomePage() {
  const posts = await getServerPosts();

  return (
    <main>
      <h1>RSC vs RCC</h1>
      <p style={{ color: '#64748b' }}>
        หน้านี้เป็น Server Component: ดึงโพสต์บน server แล้วส่ง props ให้ Client Component
        เฉพาะส่วนที่ต้องมี interaction
      </p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: '1rem',
              marginBottom: '0.75rem',
            }}
          >
            <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.1rem' }}>{post.title}</h2>
            <p style={{ margin: '0 0 0.75rem', color: '#475569' }}>{post.excerpt}</p>
            <LikeButton postId={post.id} initialLikes={post.likes} />
          </li>
        ))}
      </ul>
    </main>
  );
}
