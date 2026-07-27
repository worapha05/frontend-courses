<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import OrdersGrid from '$lib/components/OrdersGrid.svelte';

  let { data } = $props();

  // draft จาก URL — sync ด้วย $effect.pre แทน init จาก data โดยตรง (เลี่ยง state_referenced_locally)
  let q = $state('');
  let status = $state('all');

  $effect.pre(() => {
    q = data.q;
    status = data.status;
  });

  function applyFilters() {
    const url = new URL($page.url);
    url.searchParams.set('page', '1');
    url.searchParams.set('status', status);
    if (q.trim()) url.searchParams.set('q', q.trim());
    else url.searchParams.delete('q');
    goto(`${url.pathname}?${url.searchParams.toString()}`);
  }

  function goPage(next: number) {
    const url = new URL($page.url);
    url.searchParams.set('page', String(next));
    goto(`${url.pathname}?${url.searchParams.toString()}`);
  }
</script>

<svelte:head>
  <title>Orders — Ops Console</title>
</svelte:head>

<main class="mx-auto max-w-6xl space-y-6 px-4 py-10">
  <header class="space-y-1">
    <h1 class="text-2xl font-semibold text-slate-50">Orders</h1>
    <p class="text-sm text-slate-400">
      ข้อมูลจาก mock ORM <code class="text-emerald-400">db.order.*</code> · grid ใช้ windowing
    </p>
  </header>

  <form
    class="flex flex-wrap items-end gap-3 rounded-lg border border-slate-800 bg-slate-900/40 p-4"
    onsubmit={(e) => {
      e.preventDefault();
      applyFilters();
    }}
  >
    <div class="flex flex-col gap-1">
      <label class="text-xs text-slate-500" for="q">ค้นหา</label>
      <input
        id="q"
        class="rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
        bind:value={q}
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-xs text-slate-500" for="status">Status</label>
      <select
        id="status"
        class="rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
        bind:value={status}
      >
        <option value="all">all</option>
        <option value="pending">pending</option>
        <option value="paid">paid</option>
        <option value="shipped">shipped</option>
        <option value="cancelled">cancelled</option>
      </select>
    </div>
    <button
      type="submit"
      class="rounded bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-500"
    >
      Apply
    </button>
  </form>

  <p class="text-sm text-slate-400">
    {data.total.toLocaleString('th-TH')} รายการ · หน้า {data.page}/{data.pageCount}
  </p>

  <OrdersGrid orders={data.items} />

  <div class="flex gap-3">
    <button
      type="button"
      class="rounded border border-slate-700 px-3 py-1.5 text-sm disabled:opacity-40"
      disabled={data.page <= 1}
      onclick={() => goPage(data.page - 1)}
    >
      Prev
    </button>
    <button
      type="button"
      class="rounded border border-slate-700 px-3 py-1.5 text-sm disabled:opacity-40"
      disabled={data.page >= data.pageCount}
      onclick={() => goPage(data.page + 1)}
    >
      Next
    </button>
  </div>
</main>
