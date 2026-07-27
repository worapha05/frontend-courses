<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>สินค้า — Routing & Load</title>
</svelte:head>

<main>
  <h1>รายการสินค้า</h1>
  <p class="muted">โหลดจาก <code>$lib/server/products.ts</code> ผ่าน <code>+page.server.ts</code></p>

  <div class="list">
    {#each data.products as product (product.id)}
      <a class="card" href={`/products/${product.id}`}>
        <strong>{product.name}</strong>
        <div class="price">฿{product.price.toLocaleString('th-TH')}</div>
        <div class="muted">{product.description}</div>
      </a>
    {/each}
  </div>
</main>
