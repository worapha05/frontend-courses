<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { cart } from '$lib/stores/cart';

  const total = $derived($cart.reduce((sum, i) => sum + i.price * i.qty, 0));
</script>

<svelte:head>
  <title>ตะกร้า — Bookshop</title>
</svelte:head>

<main>
  <h1>ตะกร้า</h1>
  <p class="muted">custom store + transition ตอนเพิ่ม/ลบรายการ</p>

  {#if $cart.length === 0}
    <div class="card" style="margin-top: 1rem">
      <p>ตะกร้าว่าง — <a href="/books">เลือกหนังสือ</a></p>
    </div>
  {:else}
    <div class="card" style="margin-top: 1rem">
      {#each $cart as item (item.id)}
        <div
          class="row"
          in:fly={{ x: -12, duration: 200 }}
          out:fade={{ duration: 160 }}
          animate:flip={{ duration: 200 }}
        >
          <div>
            <strong>{item.title}</strong>
            <div class="muted">
              ฿{item.price.toLocaleString('th-TH')} × {item.qty}
            </div>
          </div>
          <div style="display: flex; gap: 0.4rem; align-items: center">
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
            <button class="danger" type="button" onclick={() => cart.remove(item.id)}>
              ลบ
            </button>
          </div>
        </div>
      {/each}

      <div class="row">
        <strong>รวม</strong>
        <strong class="price">฿{total.toLocaleString('th-TH')}</strong>
      </div>

      <div class="actions">
        <a class="btn" href="/checkout">ไปชำระเงิน</a>
        <button class="ghost" type="button" onclick={() => cart.clear()}>ล้างตะกร้า</button>
      </div>
    </div>
  {/if}
</main>
