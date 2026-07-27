<script lang="ts">
  import { cart } from '$lib/stores/cart';

  const total = $derived($cart.reduce((sum, i) => sum + i.price * i.qty, 0));
</script>

<svelte:head>
  <title>ตะกร้า — Stores & Context</title>
</svelte:head>

<main>
  <h1>ตะกร้าสินค้า</h1>
  <p class="muted">อ่านค่าด้วย auto-subscribe <code>$cart</code></p>

  {#if $cart.length === 0}
    <div class="card" style="margin-top: 1rem">
      <p>ตะกร้าว่าง — <a href="/">เลือกสินค้า</a></p>
    </div>
  {:else}
    <div class="card" style="margin-top: 1rem">
      {#each $cart as item (item.id)}
        <div class="row">
          <div>
            <strong>{item.name}</strong>
            <div class="muted">฿{item.price.toLocaleString('th-TH')} × {item.qty}</div>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center">
            <button
              class="ghost"
              type="button"
              onclick={() => cart.setQty(item.id, item.qty - 1)}
            >
              −
            </button>
            <span>{item.qty}</span>
            <button
              class="ghost"
              type="button"
              onclick={() => cart.setQty(item.id, item.qty + 1)}
            >
              +
            </button>
            <button class="danger" type="button" onclick={() => cart.remove(item.id)}>ลบ</button>
          </div>
        </div>
      {/each}

      <div class="row" style="margin-top: 0.5rem">
        <strong>รวม</strong>
        <strong class="price">฿{total.toLocaleString('th-TH')}</strong>
      </div>

      <button type="button" class="ghost" style="margin-top: 0.75rem" onclick={() => cart.clear()}>
        ล้างตะกร้า
      </button>
    </div>
  {/if}
</main>
