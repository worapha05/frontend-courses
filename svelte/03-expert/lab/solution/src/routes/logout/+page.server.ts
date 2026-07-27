import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sessionCookieName } from '$lib/server/auth';

export const actions: Actions = {
  default: async ({ cookies }) => {
    cookies.delete(sessionCookieName(), { path: '/' });
    throw redirect(303, '/');
  },
};
