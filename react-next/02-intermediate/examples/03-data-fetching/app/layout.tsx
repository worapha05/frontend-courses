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
        <nav
          style={{
            display: 'flex',
            gap: '1rem',
            padding: '0.75rem 1.25rem',
            background: '#fff',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          <Link href="/">Home</Link>
          <Link href="/ssr">SSR</Link>
          <Link href="/ssg">SSG</Link>
          <Link href="/isr">ISR</Link>
        </nav>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem' }}>{children}</div>
      </body>
    </html>
  );
}
