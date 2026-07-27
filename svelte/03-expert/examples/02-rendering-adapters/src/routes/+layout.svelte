<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<div class="min-h-screen">
  <nav class="border-b border-slate-800 bg-slate-950/90">
    <div class="mx-auto flex max-w-4xl flex-wrap gap-4 px-4 py-3 text-sm">
      <a class="font-semibold text-teal-400 hover:text-teal-300" href="/">Hub</a>
      <a class="text-slate-300 hover:text-white" href="/marketing">Marketing (SSG)</a>
      <a class="text-slate-300 hover:text-white" href="/news">News (SSR)</a>
      <a class="text-slate-300 hover:text-white" href="/app/dashboard">Dashboard (SPA)</a>
    </div>
  </nav>
  {@render children()}
</div>
