import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body
        className={inter.className}
        style={{ margin: 0, background: '#f8fafc', color: '#0f172a' }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>{children}</div>
      </body>
    </html>
  );
}
