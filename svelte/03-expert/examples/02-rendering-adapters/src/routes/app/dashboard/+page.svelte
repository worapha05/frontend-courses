<script lang="ts">
  import { onMount } from 'svelte';

  let ticks = $state(0);
  let ready = $state(false);

  onMount(() => {
    ready = true;
    const id = setInterval(() => {
      ticks += 1;
    }, 1000);
    return () => clearInterval(id);
  });
</script>

<svelte:head>
  <title>Dashboard — SPA mode</title>
</svelte:head>

<main class="mx-auto max-w-3xl space-y-6 px-4 py-10">
  <p class="text-sm font-medium uppercase tracking-wider text-teal-400">SPA-like (ssr = false)</p>
  <h1 class="text-3xl font-semibold text-slate-50">App Dashboard</h1>
  <p class="text-slate-400">
    <code class="text-emerald-400">export const ssr = false</code> ใน
    <code class="text-slate-300">+page.ts</code> — ไม่สร้าง HTML ของหน้านี้บน server
    เหมาะกับเครื่องมือหลังบ้านที่ไม่ต้อง SEO
  </p>

  <div class="rounded-lg border border-slate-800 bg-slate-900/60 p-6">
    {#if ready}
      <p class="text-slate-200">
        Client timer: <span class="font-mono text-teal-300">{ticks}s</span>
      </p>
      <p class="mt-2 text-xs text-slate-500">
        ค่านี้เกิดหลัง mount — ถ้าใส่ Date.now() ใน markup SSR/CSR ที่ต่างกันจะเสี่ยง hydration mismatch
        (หน้านี้ปิด SSR อยู่แล้ว แต่ควรจำแพทเทิร์นนี้ไว้)
      </p>
    {:else}
      <p class="text-slate-500">Booting client bundle…</p>
    {/if}
  </div>
</main>
