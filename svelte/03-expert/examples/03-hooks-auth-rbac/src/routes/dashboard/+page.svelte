<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<main class="mx-auto max-w-3xl space-y-4 px-4 py-10">
  <h1 class="text-2xl font-semibold text-slate-50">Dashboard</h1>
  <p class="text-slate-400">
    หน้านี้ตรวจใน <code class="text-emerald-400">+page.server.ts</code> ว่าต้องมี
    <code class="text-slate-300">locals.user</code>
  </p>
  <div class="rounded-lg border border-slate-800 bg-slate-900/50 p-5 text-sm">
    <p>สวัสดี <span class="text-teal-300">{data.user.username}</span></p>
    <p class="mt-1 text-slate-400">
      role: <span class="text-emerald-400">{data.user.role}</span>
    </p>
  </div>
  {#if data.user.role !== 'admin'}
    <p class="text-sm text-slate-500">
      บัญชีนี้ไม่ใช่ admin — ลองเปิด
      <a class="text-teal-300 hover:underline" href="/admin">/admin</a>
      จะถูกส่งไป forbidden
    </p>
  {/if}
</main>
