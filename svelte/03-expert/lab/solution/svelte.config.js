import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// ---------------------------------------------------------------------------
// สลับ adapter ตามที่ deploy จริง
// import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-static';
// import adapter from '@sveltejs/adapter-vercel';
// ---------------------------------------------------------------------------

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    // adapter-node: adapter({ out: 'build' })
    // adapter-static: adapter({ fallback: '200.html' }) // ระวัง: /orders /admin ต้องมี server
    // adapter-vercel: adapter()
  },
};

export default config;
