export async function safeUpstream<T>(
  fn: () => Promise<T>,
  fallbackMessage = 'Upstream request failed',
): Promise<T> {
  try {
    return await fn();
  } catch (err: any) {
    const status = err?.statusCode || err?.response?.status || 502;
    throw createError({
      statusCode: status >= 400 && status < 600 ? status : 502,
      statusMessage: fallbackMessage,
      data: { cause: err?.message ?? 'unknown' },
    });
  }
}
