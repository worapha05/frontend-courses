export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const limit = assertPositiveInt(getQuery(event).limit ?? 5, 'limit');

  const posts = await proxyJson<Array<{ id: number; title: string }>>(
    `${config.upstreamBase}/posts`,
    {
      headers: config.upstreamToken
        ? { Authorization: `Bearer ${config.upstreamToken}` }
        : undefined,
    },
  );

  return {
    source: config.upstreamBase,
    items: posts.slice(0, limit).map((p) => ({ id: p.id, title: p.title })),
  };
});
