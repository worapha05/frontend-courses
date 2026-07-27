<script lang="ts">
  let { data } = $props();
  const s = $derived(data.summary);
</script>

<svelte:head>
  <title>Admin Report</title>
</svelte:head>

<main class="mx-auto max-w-3xl space-y-6 px-4 py-10">
  <header class="space-y-1">
    <h1 class="text-2xl font-semibold text-slate-50">Sales Summary</h1>
    <p class="text-sm text-slate-400">
      admin only · ข้อมูลจาก <code class="text-emerald-400">db.report.salesSummary()</code> + TTL cache 15s
    </p>
  </header>

  <div class="rounded-lg border border-slate-800 bg-slate-900/50 p-5 text-sm">
    <p>
      Cache:
      {#if s.cacheHit}
        <span class="text-emerald-400">HIT</span>
      {:else}
        <span class="text-amber-300">MISS</span> (คำนวณใหม่ ~350ms)
      {/if}
    </p>
    <p class="mt-2 text-slate-500">
      computedAt (ISO จาก server): <time datetime={s.computedAt}>{s.computedAt}</time>
    </p>
  </div>

  <dl class="grid gap-4 sm:grid-cols-2">
    <div class="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
      <dt class="text-xs text-slate-500">Orders</dt>
      <dd class="text-2xl font-semibold text-teal-300">{s.orderCount.toLocaleString('th-TH')}</dd>
    </div>
    <div class="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
      <dt class="text-xs text-slate-500">Revenue (excl. cancelled)</dt>
      <dd class="text-2xl font-semibold text-emerald-400">
        ฿{s.revenue.toLocaleString('th-TH')}
      </dd>
    </div>
  </dl>

  <ul class="space-y-2 text-sm text-slate-300">
    {#each Object.entries(s.byStatus) as [status, count]}
      <li class="flex justify-between rounded border border-slate-800 px-3 py-2">
        <span>{status}</span>
        <span class="tabular-nums text-teal-300">{count}</span>
      </li>
    {/each}
  </ul>

  <p class="text-xs text-slate-500">
    รีเฟรชหน้าภายใน 15 วินาทีควรได้ cache HIT — ทดสอบด้วยการ reload ซ้ำ
  </p>
</main>
