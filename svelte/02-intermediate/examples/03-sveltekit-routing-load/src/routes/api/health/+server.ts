import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  return json({
    ok: true,
    service: '03-sveltekit-routing-load',
    at: new Date().toISOString(),
  });
};
