export default defineEventHandler(() => {
  return {
    generatedAt: new Date().toISOString(),
    items: [
      { id: 1, title: 'Nuxt hybrid rendering tips' },
      { id: 2, title: 'When to choose SWR vs prerender' },
      { id: 3, title: 'CSR for authenticated dashboards' },
    ],
  };
});
