export function assertPositiveInt(value: unknown, name: string): number {
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: `${name} must be a positive integer`,
    });
  }
  return n;
}

export async function proxyJson<T>(url: string, init?: Parameters<typeof $fetch>[1]): Promise<T> {
  try {
    return await $fetch<T>(url, init);
  } catch (err: any) {
    const status = err?.statusCode || err?.response?.status || 502;
    throw createError({
      statusCode: status >= 400 && status < 600 ? status : 502,
      statusMessage: 'Upstream request failed',
      data: { cause: err?.message ?? 'unknown' },
    });
  }
}
