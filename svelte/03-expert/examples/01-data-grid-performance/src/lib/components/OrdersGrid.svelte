<script lang="ts">
  import { onMount } from 'svelte';
  import type { Order } from '$lib/types';

  type Props = {
    orders: Order[];
  };

  let { orders }: Props = $props();

  const ROW_HEIGHT = 40;
  const OVERSCAN = 8;
  const VIEWPORT_HEIGHT = 480;

  let scrollTop = $state(0);
  let viewportEl: HTMLDivElement | undefined = $state();

  // client-side secondary filter — ใช้ $derived ไม่ใช่ $effect
  let localStatus = $state<'all' | Order['status']>('all');

  const rows = $derived(
    localStatus === 'all' ? orders : orders.filter((o) => o.status === localStatus)
  );

  const startIndex = $derived(
    Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN)
  );

  const endIndex = $derived(
    Math.min(
      rows.length,
      Math.ceil((scrollTop + VIEWPORT_HEIGHT) / ROW_HEIGHT) + OVERSCAN
    )
  );

  const visible = $derived(rows.slice(startIndex, endIndex));
  const topPad = $derived(startIndex * ROW_HEIGHT);
  const bottomPad = $derived(Math.max(0, (rows.length - endIndex) * ROW_HEIGHT));
  const totalHeight = $derived(rows.length * ROW_HEIGHT);

  function statusClass(status: Order['status']) {
    switch (status) {
      case 'paid':
        return 'text-emerald-400';
      case 'shipped':
        return 'text-teal-300';
      case 'pending':
        return 'text-amber-300';
      case 'cancelled':
        return 'text-rose-400';
    }
  }

  onMount(() => {
    const el = viewportEl;
    if (!el) return;

    const onScroll = () => {
      scrollTop = el.scrollTop;
    };

    // passive: true ลด main-thread blocking ตอน scroll
    el.addEventListener('scroll', onScroll, { passive: true });

    // สำคัญ: ลบ listener เมื่อ component ถูกทำลาย — กัน memory leak
    return () => {
      el.removeEventListener('scroll', onScroll);
    };
  });
</script>

<div class="space-y-3">
  <div class="flex flex-wrap items-center gap-3">
    <label class="text-sm text-slate-400" for="local-status">
      Filter ในหน้า (client $derived)
    </label>
    <select
      id="local-status"
      class="rounded border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-100 focus:border-teal-500 focus:outline-none"
      bind:value={localStatus}
    >
      <option value="all">all</option>
      <option value="pending">pending</option>
      <option value="paid">paid</option>
      <option value="shipped">shipped</option>
      <option value="cancelled">cancelled</option>
    </select>
    <span class="text-xs text-slate-500">
      แสดง DOM {visible.length} / {rows.length} แถว (windowed) · ความสูงรวม {totalHeight}px
    </span>
  </div>

  <div
    bind:this={viewportEl}
    class="overflow-auto rounded-lg border border-slate-700 bg-slate-900/60"
    style={`height: ${VIEWPORT_HEIGHT}px;`}
  >
    <table class="w-full border-collapse text-left text-sm">
      <thead class="sticky top-0 z-10 bg-slate-900 text-teal-300">
        <tr class="border-b border-slate-700">
          <th class="px-3 py-2 font-medium">Order</th>
          <th class="px-3 py-2 font-medium">Customer</th>
          <th class="px-3 py-2 font-medium">Status</th>
          <th class="px-3 py-2 font-medium text-right">Total</th>
          <th class="px-3 py-2 font-medium">Created</th>
        </tr>
      </thead>
      <tbody>
        {#if topPad > 0}
          <tr aria-hidden="true">
            <td colspan="5" style={`height: ${topPad}px; padding: 0; border: 0;`}></td>
          </tr>
        {/if}

        {#each visible as order (order.id)}
          <tr
            class="border-b border-slate-800/80 hover:bg-slate-800/80"
            style={`height: ${ROW_HEIGHT}px;`}
          >
            <td class="px-3 font-mono text-slate-200">{order.id}</td>
            <td class="px-3 text-slate-300">{order.customer}</td>
            <td class={`px-3 font-medium ${statusClass(order.status)}`}>{order.status}</td>
            <td class="px-3 text-right tabular-nums text-slate-200">
              ฿{order.total.toLocaleString('th-TH')}
            </td>
            <td class="px-3 font-mono text-xs text-slate-500">{order.createdAt}</td>
          </tr>
        {/each}

        {#if bottomPad > 0}
          <tr aria-hidden="true">
            <td colspan="5" style={`height: ${bottomPad}px; padding: 0; border: 0;`}></td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>
