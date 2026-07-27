import { cachedEventHandler } from 'nitropack/runtime';

let hits = 0;

export default cachedEventHandler(
  async () => {
    hits += 1;
    // จำลองงานหนัก
    await new Promise((r) => setTimeout(r, 200));
    return {
      generatedAt: new Date().toISOString(),
      hits,
      summary: {
        orders: 1280,
        aov: 1420.5,
        conversion: 0.037,
      },
    };
  },
  {
    maxAge: 15,
    name: 'demo-report',
    getKey: () => 'default',
  },
);
