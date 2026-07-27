import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-slate-900 text-white">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
            <strong>Commerce Ops Lab</strong>
            <Link className="text-sm text-teal-300 hover:text-white" href="/">
              Home
            </Link>
            <Link className="text-sm text-teal-300 hover:text-white" href="/dashboard">
              Dashboard
            </Link>
            <Link className="text-sm text-teal-300 hover:text-white" href="/login">
              Login
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
