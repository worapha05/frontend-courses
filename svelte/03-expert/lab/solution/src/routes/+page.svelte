<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>Enterprise Ops Console</title>
</svelte:head>

<main class="mx-auto max-w-6xl space-y-8 px-4 py-10">
  <header class="space-y-2">
    <p class="text-sm font-medium uppercase tracking-wider text-teal-400">Lab Solution</p>
    <h1 class="text-3xl font-semibold text-slate-50">Enterprise Ops Console</h1>
    <p class="max-w-2xl text-slate-400">
      รวม virtualized grid · demo session/RBAC · prerender + SPA route · mock ORM · TTL cache
    </p>
  </header>

  <!--
    Hydration mismatch pitfall:
    อย่าเรนเดอร์ Date.now() / toLocaleString() ให้ผลต่างกันระหว่าง SSR กับ CSR
    — ส่ง ISO จาก server หรือรอ onMount ก่อนแสดงค่าที่ขึ้นกับ browser/timezone
  -->

  <div class="rounded-lg border border-amber-900/50 bg-amber-950/20 p-4 text-sm text-amber-200/90">
    Auth ในแล็บนี้เป็น <strong class="font-semibold">DEMO / educational only</strong> —
    ห้ามยกไป production โดยไม่ hardening (secret จาก env, secure cookies, password hashing, ฯลฯ)
  </div>

  <div class="rounded-lg border border-slate-800 bg-slate-900/40 p-5 text-sm text-slate-300">
    {#if data.user}
      เข้าสู่ระบบแล้ว: <span class="text-teal-300">{data.user.username}</span>
      ({data.user.role})
    {:else}
      ยังเป็น guest — login ด้วย admin / editor / user (รหัสดูที่ /login)
    {/if}
  </div>

  <ul class="grid gap-3 text-sm sm:grid-cols-2">
    <li class="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
      <a class="font-medium text-teal-300 hover:underline" href="/orders">/orders</a>
      <p class="mt-1 text-slate-500">Virtualized order grid + mock ORM pagination</p>
    </li>
    <li class="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
      <a class="font-medium text-teal-300 hover:underline" href="/admin">/admin</a>
      <p class="mt-1 text-slate-500">Admin-only sales report (TTL cache)</p>
    </li>
    <li class="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
      <a class="font-medium text-teal-300 hover:underline" href="/about">/about</a>
      <p class="mt-1 text-slate-500">prerender = true (SSG)</p>
    </li>
    <li class="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
      <a class="font-medium text-teal-300 hover:underline" href="/app/settings">/app/settings</a>
      <p class="mt-1 text-slate-500">ssr = false (SPA-like)</p>
    </li>
  </ul>
</main>
