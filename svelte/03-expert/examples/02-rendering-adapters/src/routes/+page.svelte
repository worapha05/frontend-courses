<script lang="ts">
</script>

<svelte:head>
  <title>Rendering Strategies — Expert</title>
</svelte:head>

<main class="mx-auto max-w-4xl space-y-8 px-4 py-10">
  <header class="space-y-2">
    <p class="text-sm font-medium uppercase tracking-wider text-teal-400">Example 02</p>
    <h1 class="text-3xl font-semibold text-slate-50">Rendering Strategies & Adapters</h1>
    <p class="text-slate-400">
      SvelteKit อนุญาตให้เลือก SSR / SSG / SPA-like <strong class="font-medium text-slate-200">ต่อ route</strong>
      แล้วค่อยเลือก adapter ให้ตรงกับที่ deploy
    </p>
  </header>

  <section class="space-y-4">
    <h2 class="text-xl font-semibold text-slate-100">เส้นทางในตัวอย่างนี้</h2>
    <ul class="space-y-3 text-sm text-slate-300">
      <li class="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
        <a class="font-medium text-teal-300 hover:underline" href="/marketing">/marketing</a>
        — <code class="text-emerald-400">export const prerender = true</code> (SSG ตอน build)
      </li>
      <li class="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
        <a class="font-medium text-teal-300 hover:underline" href="/news">/news</a>
        — SSR ผ่าน <code class="text-emerald-400">+page.server.ts</code> (headline ตามเวลา request)
      </li>
      <li class="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
        <a class="font-medium text-teal-300 hover:underline" href="/app/dashboard">/app/dashboard</a>
        — <code class="text-emerald-400">export const ssr = false</code> (เรนเดอร์ฝั่ง client เหมือน SPA)
      </li>
    </ul>
  </section>

  <section class="space-y-3 rounded-lg border border-slate-800 bg-slate-900/40 p-5 text-sm text-slate-300">
    <h2 class="text-lg font-semibold text-slate-100">Adapters</h2>
    <p>
      อ่านคู่มือภาษาไทยใน
      <code class="text-teal-300">ADAPTERS.md</code>
      และสลับ import ใน
      <code class="text-teal-300">svelte.config.js</code>
    </p>
    <pre class="overflow-x-auto rounded bg-slate-950 p-3 text-xs text-emerald-300">adapter-auto | adapter-node | adapter-static | adapter-vercel</pre>
  </section>
</main>
