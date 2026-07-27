import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(303, '/login');
  // RBAC: เฉพาะ admin เห็นรายงาน — user/editor ถูกส่งไป forbidden
  if (locals.user.role !== 'admin') throw redirect(303, '/forbidden');

  const summary = await db.report.salesSummary();
  return { user: locals.user, summary };
};
