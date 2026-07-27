import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: Promise<{ from?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const { from } = await searchParams;

  async function login() {
    'use server';
    const jar = await cookies();
    jar.set('session', 'demo-user', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });
    redirect(from && from.startsWith('/') ? from : '/dashboard');
  }

  return (
    <main className="mx-auto max-w-md space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-xl font-bold">Login (demo)</h1>
      <p className="text-sm text-slate-600">
        กดปุ่มเพื่อตั้ง cookie <code>session</code> — Middleware จะปล่อยเข้า /dashboard
      </p>
      <form action={login}>
        <button
          type="submit"
          className="w-full rounded-md bg-teal-700 px-4 py-2 font-semibold text-white"
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </main>
  );
}
