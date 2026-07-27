<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>{data.product.name} — Routing & Load</title>
</svelte:head>

<main>
  <p><a href="/products">← กลับรายการ</a></p>
  <h1>{data.product.name}</h1>
  <p class="price">฿{data.product.price.toLocaleString('th-TH')}</p>
  <p>{data.product.description}</p>
  <p class="muted">id: <code>{data.product.id}</code></p>
</main>
