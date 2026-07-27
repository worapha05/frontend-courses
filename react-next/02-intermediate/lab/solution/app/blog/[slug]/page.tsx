import { notFound } from 'next/navigation';
import { getPost, posts } from '@/data/posts';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article>
      <p style={{ color: '#64748b', fontSize: '0.85rem' }}>SSG · /blog/{slug}</p>
      <h1>{post.title}</h1>
      <p style={{ lineHeight: 1.7 }}>{post.body}</p>
    </article>
  );
}
