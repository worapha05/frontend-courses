<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>Hooks Auth RBAC — Expert</title>
</svelte:head>

<main class="mx-auto max-w-3xl space-y-6 px-4 py-10">
  <p class="text-sm font-medium uppercase tracking-wider text-teal-400">Example 03</p>
  <h1 class="text-3xl font-semibold text-slate-50">JWT-like Session + RBAC</h1>
  <p class="text-slate-400">
    Demo session ลงนามด้วย Web Crypto HMAC —
    <strong class="font-medium text-amber-300">educational only</strong> ไม่ใช่ production auth
  </p>

  <div class="rounded-lg border border-slate-800 bg-slate-900/50 p-5 text-sm text-slate-300">
    {#if data.user}
      <p>
        เข้าสู่ระบบแล้วในฐานะ
        <span class="text-teal-300">{data.user.username}</span>
        (role: <span class="text-emerald-400">{data.user.role}</span>)
      </p>
    {:else}
      <p>ยังไม่ได้ login — ลองบัญชีด้านล่าง</p>
    {/if}
  </div>

  <section class="space-y-2 text-sm text-slate-400">
    <h2 class="text-lg font-semibold text-slate-100">Seed users</h2>
    <ul class="list-inside list-disc space-y-1">
      <li><code class="text-teal-300">admin</code> / <code class="text-teal-300">admin123</code> → admin</li>
      <li><code class="text-teal-300">editor</code> / <code class="text-teal-300">editor123</code> → editor</li>
      <li><code class="text-teal-300">user</code> / <code class="text-teal-300">user123</code> → user</li>
    </ul>
  </section>

  <ul class="space-y-2 text-sm">
    <li><a class="text-teal-300 hover:underline" href="/login">/login</a> — form action</li>
    <li><a class="text-teal-300 hover:underline" href="/dashboard">/dashboard</a> — ต้อง login</li>
    <li><a class="text-teal-300 hover:underline" href="/admin">/admin</a> — ต้อง role admin</li>
  </ul>
</main>
