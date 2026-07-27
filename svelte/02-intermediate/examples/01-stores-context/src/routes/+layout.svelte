<script lang="ts">
  import { setContext } from 'svelte';
  import { get } from 'svelte/store';
  import '../app.css';
  import { cart } from '$lib/stores/cart';
  import { theme, toggleTheme, type ThemeMode } from '$lib/stores/theme';

  let { children } = $props();

  /** Reactive theme helper passed via context (not a plain string). */
  const themeApi = {
    get mode(): ThemeMode {
      return get(theme);
    },
    subscribe: theme.subscribe,
    toggle: toggleTheme
  };

  setContext('theme', themeApi);

  $effect(() => {
    const unsubscribe = theme.subscribe((mode) => {
      document.documentElement.dataset.theme = mode;
    });
    return unsubscribe;
  });
</script>

<div class="shell">
  <header class="nav">
    <a class="brand" href="/">Store + Context Demo</a>
    <nav class="nav-links">
      <a href="/">สินค้า</a>
      <a href="/cart">
        ตะกร้า
        <span class="badge">{$cart.reduce((n, i) => n + i.qty, 0)}</span>
      </a>
      <button class="ghost" type="button" onclick={() => themeApi.toggle()}>
        ธีม: {$theme === 'light' ? 'สว่าง' : 'มืด'}
      </button>
    </nav>
  </header>

  {@render children()}
</div>
