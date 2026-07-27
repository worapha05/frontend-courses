<svelte:head>
  <title>Marketing — Prerendered</title>
</svelte:head>

<main class="mx-auto max-w-3xl space-y-6 px-4 py-10">
  <p class="text-sm font-medium uppercase tracking-wider text-teal-400">SSG / Prerender</p>
  <h1 class="text-3xl font-semibold text-slate-50">Marketing Landing</h1>
  <p class="text-slate-400">
    หน้านี้ตั้ง <code class="text-emerald-400">export const prerender = true</code> ใน
    <code class="text-slate-300">+page.ts</code> — HTML ถูกสร้างตอน
    <code class="text-slate-300">vite build</code> จึงเหมาะกับเนื้อหานิ่งและ CDN
  </p>
  <div class="rounded-lg border border-slate-800 bg-gradient-to-br from-slate-900 to-teal-950/40 p-8">
    <p class="text-2xl font-semibold text-teal-200">Ship faster with SvelteKit</p>
    <p class="mt-2 text-slate-400">แบรนด์และข้อความนิ่ง — ไม่ต้อง SSR ทุก request</p>
  </div>
</main>
