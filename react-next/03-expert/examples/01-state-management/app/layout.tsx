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
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>{children}</div>
      </body>
    </html>
  );
}
