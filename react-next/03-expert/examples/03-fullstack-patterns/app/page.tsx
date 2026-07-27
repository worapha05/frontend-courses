import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Server Actions · Middleware · Dashboard</h1>
      <p className="max-w-2xl text-slate-600">
        เข้าสู่ระบบด้วย cookie <code className="rounded bg-slate-200 px-1">session</code> แล้วไปที่
        Dashboard เพื่อสร้าง todo ผ่าน Server Action และดู grid แบบ responsive
      </p>
      <Link
        href="/login"
        className="inline-flex rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
      >
        ไปหน้า Login
      </Link>
    </main>
  );
}
