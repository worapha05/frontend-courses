import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// ---------------------------------------------------------------------------
// สลับ adapter ตามที่ deploy จริง (ดูรายละเอียดใน ADAPTERS.md)
// ---------------------------------------------------------------------------
// import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-static';
// import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    // ค่าเริ่มต้น: adapter-auto
    adapter: adapter(),

    // --- adapter-node ---
    // adapter: adapter({ out: 'build' })

    // --- adapter-static (ต้อง prerender หรือมี fallback) ---
    // adapter: adapter({
    // pages: 'build',
    // assets: 'build',
    // fallback: '200.html',
    // precompress: false
    // })

    // --- adapter-vercel ---
    // adapter: adapter()
  },
};

export default config;
