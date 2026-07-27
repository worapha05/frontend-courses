import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="th">
      <body
        style={{
          margin: 0,
          fontFamily: 'Segoe UI, system-ui, sans-serif',
          background: '#f8fafc',
          color: '#0f172a',
        }}
      >
        <header
          style={{
            display: 'flex',
            gap: '1rem',
            padding: '0.85rem 1.25rem',
            background: '#0f172a',
            color: '#fff',
            flexWrap: 'wrap',
          }}
        >
          <strong>Catalog Lab</strong>
          <Link href="/" style={{ color: '#67e8f9' }}>
            Home
          </Link>
          <Link href="/products" style={{ color: '#67e8f9' }}>
            Products
          </Link>
          <Link href="/blog/rsc-first" style={{ color: '#67e8f9' }}>
            Blog
          </Link>
        </header>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '2rem 1rem' }}>{children}</div>
      </body>
    </html>
  );
}
