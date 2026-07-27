<script lang="ts">
  import '../app.css';

  let { data, children } = $props();
</script>

<div class="min-h-screen">
  <header class="border-b border-slate-800 bg-slate-950/90">
    <div class="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3">
      <nav class="flex flex-wrap gap-4 text-sm">
        <a class="font-semibold text-teal-400 hover:text-teal-300" href="/">Home</a>
        <a class="text-slate-300 hover:text-white" href="/dashboard">Dashboard</a>
        <a class="text-slate-300 hover:text-white" href="/admin">Admin</a>
        <a class="text-slate-300 hover:text-white" href="/login">Login</a>
      </nav>
      <div class="text-xs text-slate-500">
        {#if data.user}
          <span class="text-slate-300">{data.user.username}</span>
          · <span class="text-emerald-400">{data.user.role}</span>
          <form class="ml-2 inline" method="POST" action="/logout">
            <button class="text-teal-400 hover:underline" type="submit">Logout</button>
          </form>
        {:else}
          guest
        {/if}
      </div>
    </div>
  </header>
  {@render children()}
</div>
