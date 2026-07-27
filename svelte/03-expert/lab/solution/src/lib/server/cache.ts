/**
 * In-memory TTL cache — DEMO / single-process only.
 * Production multi-instance → Redis / shared store + explicit invalidation.
 */

type Entry<T> = { value: T; expires: number };

const store = new Map<string, Entry<unknown>>();

export async function cached<T>(
  key: string,
  ttlMs: number,
  fn: () => Promise<T>,
): Promise<{ value: T; cacheHit: boolean }> {
  const hit = store.get(key);
  if (hit && hit.expires > Date.now()) {
    return { value: hit.value as T, cacheHit: true };
  }

  const value = await fn();
  store.set(key, { value, expires: Date.now() + ttlMs });
  return { value, cacheHit: false };
}

export function cacheClear(prefix?: string) {
  if (!prefix) {
    store.clear();
    return;
  }
  for (const key of store.keys()) {
    if (key.startsWith(prefix)) store.delete(key);
  }
}
