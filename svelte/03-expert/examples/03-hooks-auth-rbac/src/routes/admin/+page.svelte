<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>Admin</title>
</svelte:head>

<main class="mx-auto max-w-3xl space-y-4 px-4 py-10">
  <h1 class="text-2xl font-semibold text-slate-50">Admin Console</h1>
  <p class="text-slate-400">
    RBAC: เฉพาะ <code class="text-emerald-400">role === 'admin'</code>
  </p>
  <div class="rounded-lg border border-teal-900/60 bg-teal-950/30 p-5 text-sm text-teal-100">
    Welcome, {data.user.username}. คุณเห็นรายงานระดับองค์กรได้ที่นี่ (demo).
  </div>
</main>
