<script lang="ts">
  import { onMount } from 'svelte';

  let ready = $state(false);
  let clientStamp = $state('');

  onMount(() => {
    ready = true;
    // ปลอดภัย: ค่าที่ขึ้นกับ browser ถูกตั้งหลัง mount เท่านั้น
    // ถ้าใส่ new Date().toLocaleString() ใน markup SSR โดยตรง อาจ hydration mismatch
    clientStamp = new Date().toLocaleString('th-TH');
  });
</script>

<svelte:head>
  <title>Settings — SPA mode</title>
</svelte:head>

<main class="mx-auto max-w-3xl space-y-4 px-4 py-10">
  <p class="text-sm font-medium uppercase tracking-wider text-teal-400">ssr = false</p>
  <h1 class="text-2xl font-semibold text-slate-50">App Settings</h1>
  <p class="text-slate-400">
    หน้านี้เป็น SPA-like — ไม่ SSR HTML ของหน้านี้บน server
  </p>

  <div class="rounded-lg border border-slate-800 bg-slate-900/50 p-5 text-sm">
    {#if ready}
      <p class="text-slate-200">
        Client locale time: <span class="font-mono text-teal-300">{clientStamp}</span>
      </p>
    {:else}
      <p class="text-slate-500">Loading client bundle…</p>
    {/if}
  </div>
</main>
