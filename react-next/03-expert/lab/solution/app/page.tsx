import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Commerce Ops Dashboard</h1>
      <p className="text-slate-600">
        Lab ระดับ Expert — Middleware auth, Server Actions, repository pattern, Zustand UI prefs และ
        Tailwind responsive grid
      </p>
      <Link
        href="/login"
        className="inline-flex rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
      >
        เริ่มที่ Login
      </Link>
    </main>
  );
}
