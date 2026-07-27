import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 48px)' }}>
      <aside
        style={{
          width: 200,
          background: '#fff',
          borderRight: '1px solid #e2e8f0',
          padding: '1rem',
        }}
      >
        <strong>Dashboard</strong>
        <nav style={{ display: 'grid', gap: '0.5rem', marginTop: '1rem' }}>
          <Link href="/dashboard">Overview</Link>
          <Link href="/">← กลับ Marketing</Link>
        </nav>
      </aside>
      <section style={{ flex: 1, padding: '1.5rem' }}>{children}</section>
    </div>
  );
}
