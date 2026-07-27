/**
 * DEMO-ONLY authentication helpers for the Svelte Mastery bootcamp.
 *
 * Educational session tokens using Web Crypto HMAC-SHA-256.
 * DO NOT use this as-is in production:
 * - secret is hardcoded for local learning
 * - no refresh/rotation, no CSRF strategy beyond sameSite
 * - passwords are plain demo values
 */

import type { Role, SessionUser } from '$lib/types';

export type { Role, SessionUser };

type SeedUser = SessionUser & { password: string };

/** Seed accounts for the workshop (demo-only). */
export const SEED_USERS: SeedUser[] = [
  { id: 'u-admin', username: 'admin', password: 'admin123', role: 'admin' },
  { id: 'u-editor', username: 'editor', password: 'editor123', role: 'editor' },
  { id: 'u-user', username: 'user', password: 'user123', role: 'user' },
];

// DEMO-ONLY secret — replace with env var + KMS in real systems
const DEMO_SECRET = 'svelte-mastery-demo-secret-not-for-prod';

const SESSION_COOKIE = 'sk_demo_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = '';
  for (const b of arr) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(DEMO_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

async function signPayload(payloadB64: string): Promise<string> {
  const key = await getKey();
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadB64));
  return toBase64Url(sig);
}

export function findUser(username: string, password: string): SessionUser | null {
  const found = SEED_USERS.find((u) => u.username === username && u.password === password);
  if (!found) return null;
  return { id: found.id, username: found.username, role: found.role };
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  const payload = {
    sub: user.id,
    username: user.username,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const payloadB64 = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await signPayload(payloadB64);
  return `${payloadB64}.${signature}`;
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  const [payloadB64, signature] = token.split('.');
  if (!payloadB64 || !signature) return null;

  const expected = await signPayload(payloadB64);
  if (expected !== signature) return null;

  try {
    const json = new TextDecoder().decode(fromBase64Url(payloadB64));
    const payload = JSON.parse(json) as {
      sub: string;
      username: string;
      role: Role;
      exp: number;
    };
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return { id: payload.sub, username: payload.username, role: payload.role };
  } catch {
    return null;
  }
}

export function sessionCookieName() {
  return SESSION_COOKIE;
}

export function sessionCookieOptions() {
  return {
    path: '/',
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: false, // DEMO-ONLY: set true behind HTTPS in production
    maxAge: SESSION_TTL_SECONDS,
  };
}
