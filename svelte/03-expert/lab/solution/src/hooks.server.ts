import type { Handle } from '@sveltejs/kit';
import { sessionCookieName, verifySessionToken } from '$lib/server/auth';

/** DEMO-ONLY session parse — see $lib/server/auth.ts */
export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get(sessionCookieName());
  event.locals.user = token ? await verifySessionToken(token) : null;
  return resolve(event);
};
