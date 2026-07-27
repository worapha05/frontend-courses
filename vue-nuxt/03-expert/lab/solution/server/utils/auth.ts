export function requireRole(event: any, allowed: string[]) {
  const role = getHeader(event, 'x-demo-role');
  if (!role || !allowed.includes(role)) {
    throw createError({
      statusCode: 403,
      statusMessage: `Requires role: ${allowed.join(' | ')}`,
    });
  }
  return role;
}

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
