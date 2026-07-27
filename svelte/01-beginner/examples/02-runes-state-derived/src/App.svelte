<script lang="ts">
  import { addItem, cart, clearCart, removeItem } from './lib/cart.svelte';

  let catalogName = $state('Tea Mug');
  let catalogPrice = $state(180);

  // ค่าที่คำนวณจาก state — อย่าไป sync ด้วย $effect
  const itemCount = $derived(cart.items.reduce((sum, i) => sum + i.qty, 0));
  const total = $derived(cart.items.reduce((sum, i) => sum + i.price * i.qty, 0));

  // $inspect ช่วย debug ใน dev — เปิด console ดูเมื่อ count เปลี่ยน
  $inspect(itemCount);

  $effect(() => {
    console.log(`[cart] items=${itemCount}, total=${total}`);

    // cleanup รันก่อน effect รอบถัดไป / ตอน unmount
    return () => {
      console.log('[cart] effect cleanup');
    };
  });

  /*
   * ❌ Anti-pattern — อย่าทำแบบนี้:
   *
   * let totalMirror = $state(0);
   * $effect(() => {
   *   totalMirror = total; // sync derived กลับเข้า state = วงจรซ้ำ / bug ง่าย
   * });
   *
   * ✅ ใช้ $derived(total) โดยตรงใน template หรือส่งต่อไปเป็น prop
   */
</script>

<main>
  <h1>Runes: $state · $derived · $effect</h1>
  <p class="lead">ตะกร้าสินค้าใช้ state ร่วมจาก <code>cart.svelte.ts</code></p>

  <section class="card stats">
    <div>
      <span class="label">Items</span>
      <strong>{itemCount}</strong>
    </div>
    <div>
      <span class="label">Total</span>
      <strong>฿{total}</strong>
    </div>
  </section>

  <section class="card">
    <h2>Cart</h2>
    {#if cart.items.length === 0}
      <p class="empty">ตะกร้าว่าง</p>
    {:else}
      <ul>
        {#each cart.items as item (item.id)}
          <li>
            <div>
              <strong>{item.name}</strong>
              <span class="meta">×{item.qty} · ฿{item.price}</span>
            </div>
            <button class="ghost" onclick={() => removeItem(item.id)}>ลบ</button>
          </li>
        {/each}
      </ul>
    {/if}
    <button class="secondary" onclick={clearCart} disabled={cart.items.length === 0}>
      Clear cart
    </button>
  </section>

  <section class="card">
    <h2>Add to cart</h2>
    <div class="row">
      <input bind:value={catalogName} placeholder="ชื่อสินค้า" />
      <input type="number" bind:value={catalogPrice} min="1" />
      <button onclick={() => addItem(catalogName.trim() || 'Item', Number(catalogPrice) || 0)}>
        Add
      </button>
    </div>
  </section>

  <aside class="note">
    <p>
      เปิด DevTools → Console เพื่อดู log จาก <code>$effect</code> และ
      <code>$inspect(itemCount)</code>
    </p>
  </aside>
</main>

<style>
  h1 {
    margin: 0 0 0.35rem;
    font-size: 1.55rem;
  }

  .lead {
    color: #475569;
    margin: 0 0 1.25rem;
  }

  code {
    font-size: 0.9em;
    background: #e2e8f0;
    padding: 0.1rem 0.35rem;
    border-radius: 4px;
  }

  .card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 1.1rem 1.2rem;
    margin-bottom: 1rem;
  }

  .stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .label {
    display: block;
    color: #64748b;
    font-size: 0.85rem;
  }

  h2 {
    margin: 0 0 0.75rem;
    font-size: 1.05rem;
  }

  ul {
    list-style: none;
    margin: 0 0 0.85rem;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    padding: 0.45rem 0;
    border-bottom: 1px solid #f1f5f9;
  }

  .meta {
    display: block;
    color: #64748b;
    font-size: 0.85rem;
  }

  .empty {
    color: #94a3b8;
    margin: 0 0 0.75rem;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  input {
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 0.45rem 0.7rem;
  }

  input[type='number'] {
    width: 6rem;
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: 8px;
    padding: 0.45rem 0.85rem;
    background: #0f766e;
    color: #fff;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  button.secondary {
    background: #334155;
  }

  button.ghost {
    background: transparent;
    color: #b91c1c;
  }

  .note {
    background: #f0fdfa;
    border: 1px solid #99f6e4;
    border-radius: 10px;
    padding: 0.85rem 1rem;
    color: #134e4a;
  }

  .note p {
    margin: 0;
  }
</style>
