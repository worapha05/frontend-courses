import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    welcome: 'ยินดีต้อนรับสู่ตัวอย่าง SvelteKit Routing + load',
  };
};
