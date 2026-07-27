<script lang="ts">
  let { form } = $props();
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<main class="mx-auto max-w-md space-y-6 px-4 py-10">
  <h1 class="text-2xl font-semibold text-slate-50">Login</h1>
  <p class="text-xs text-amber-300/90">DEMO-ONLY auth — อย่าใช้ pattern นี้ในระบบจริงโดยไม่ hardening</p>

  {#if form?.error}
    <p class="rounded border border-rose-800 bg-rose-950/40 px-3 py-2 text-sm text-rose-300">
      {form.error}
    </p>
  {/if}

  <form method="POST" class="space-y-4 rounded-lg border border-slate-800 bg-slate-900/50 p-5">
    <div class="space-y-1">
      <label class="text-xs text-slate-500" for="username">Username</label>
      <input
        id="username"
        name="username"
        required
        class="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
        autocomplete="username"
      />
    </div>
    <div class="space-y-1">
      <label class="text-xs text-slate-500" for="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        class="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
        autocomplete="current-password"
      />
    </div>
    <button
      type="submit"
      class="w-full rounded bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-500"
    >
      Sign in
    </button>
  </form>
</main>
