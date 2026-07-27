import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="th">
      <body
        style={{
          margin: 0,
          fontFamily: 'Segoe UI, system-ui, sans-serif',
          background: '#f1f5f9',
          color: '#0f172a',
        }}
      >
        <header
          style={{
            background: '#0f172a',
            color: '#fff',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <strong>Routing Demo</strong>
          <Link href="/" style={{ color: '#67e8f9' }}>
            Home
          </Link>
          <Link href="/about" style={{ color: '#67e8f9' }}>
            About
          </Link>
          <Link href="/dashboard" style={{ color: '#67e8f9' }}>
            Dashboard
          </Link>
          <Link href="/products/sku-42" style={{ color: '#67e8f9' }}>
            Product
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
