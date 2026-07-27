import type { PageServerLoad } from './$types';

const TOPICS = [
  'Svelte 5 runes adoption climbs',
  'Edge SSR latency tips for ops dashboards',
  'When to prerender vs stream HTML',
  'Adapter-node vs serverless trade-offs',
  'Hydration mismatch postmortem notes',
];

/** SSR ไดนามิก: headline ขึ้นกับเวลาของ request */
export const load: PageServerLoad = async () => {
  const now = new Date();
  const seed = now.getUTCHours() + now.getUTCMinutes();

  const headlines = Array.from({ length: 5 }, (_, i) => {
    const topic = TOPICS[(seed + i) % TOPICS.length];
    return {
      id: `n-${seed}-${i}`,
      title: topic,
      // ส่ง ISO จาก server — client format แบบเดียวกัน ลด hydration mismatch
      publishedAt: new Date(now.getTime() - i * 45 * 60_000).toISOString(),
    };
  });

  return {
    generatedAt: now.toISOString(),
    headlines,
  };
};
