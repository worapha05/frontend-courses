<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>News — SSR</title>
</svelte:head>

<main class="mx-auto max-w-3xl space-y-6 px-4 py-10">
  <p class="text-sm font-medium uppercase tracking-wider text-teal-400">SSR (Dynamic)</p>
  <h1 class="text-3xl font-semibold text-slate-50">News Desk</h1>
  <p class="text-slate-400">
    โหลดจาก <code class="text-emerald-400">+page.server.ts</code> ทุก request —
    เหมาะกับเนื้อหาที่ต้องสดและยังต้องการ HTML จาก server เพื่อ SEO
  </p>
  <p class="text-xs text-slate-500">
    Server generatedAt: <time datetime={data.generatedAt}>{data.generatedAt}</time>
  </p>

  <ul class="space-y-3">
    {#each data.headlines as item (item.id)}
      <li class="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
        <h2 class="font-medium text-slate-100">{item.title}</h2>
        <p class="mt-1 font-mono text-xs text-slate-500">{item.publishedAt}</p>
      </li>
    {/each}
  </ul>
</main>
