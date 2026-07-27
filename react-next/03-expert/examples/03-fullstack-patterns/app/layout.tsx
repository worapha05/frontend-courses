import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
            <strong className="text-teal-800">Full-stack Patterns</strong>
            <Link className="text-sm text-slate-600 hover:text-teal-700" href="/">
              Home
            </Link>
            <Link className="text-sm text-slate-600 hover:text-teal-700" href="/dashboard">
              Dashboard
            </Link>
            <Link className="text-sm text-slate-600 hover:text-teal-700" href="/login">
              Login
            </Link>
          </div>
        </header>
        <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
      </body>
    </html>
  );
}
