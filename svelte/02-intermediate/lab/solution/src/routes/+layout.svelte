<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import '../app.css';
  import { cart } from '$lib/stores/cart';
  import { toasts } from '$lib/stores/toast';

  let { children } = $props();

  const count = $derived($cart.reduce((n, i) => n + i.qty, 0));
</script>

<div class="shell">
  <header class="nav">
    <a class="brand" href="/">Bookshop Intermediate</a>
    <nav class="nav-links">
      <a href="/">หน้าแรก</a>
      <a href="/books">หนังสือ</a>
      <a href="/cart">
        ตะกร้า
        {#if count > 0}<span class="badge">{count}</span>{/if}
      </a>
      <a href="/checkout">ชำระเงิน</a>
    </nav>
  </header>

  {@render children()}
</div>

<div class="toast-stack" aria-live="polite">
  {#each $toasts as toast (toast.id)}
    <div class="toast" in:fly={{ y: 16, duration: 220 }} out:fade={{ duration: 160 }}>
      {toast.message}
    </div>
  {/each}
</div>
