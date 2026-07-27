import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
  createSessionToken,
  findUser,
  sessionCookieName,
  sessionCookieOptions,
} from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) throw redirect(303, '/orders');
  return {};
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const username = String(form.get('username') ?? '');
    const password = String(form.get('password') ?? '');

    const user = findUser(username, password);
    if (!user) {
      return fail(400, { error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง (demo)' });
    }

    const token = await createSessionToken(user);
    cookies.set(sessionCookieName(), token, sessionCookieOptions());
    throw redirect(303, '/orders');
  },
};
