<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>หน้าแรก — Routing & Load</title>
</svelte:head>

<main>
  <h1>หน้าแรก</h1>
  <p>{data.welcome}</p>
  <p class="muted">ข้อมูลนี้มาจาก <code>+page.server.ts</code> ของ route <code>/</code></p>

  <div class="card" style="margin-top: 1.25rem">
    <p>ลองไปที่:</p>
    <ul>
      <li><a href="/products">รายการสินค้า</a> (server load)</li>
      <li><a href="/products/sku-1">รายละเอียดสินค้า</a> (dynamic <code>[id]</code>)</li>
      <li><a href="/products/missing">สินค้าที่ไม่มี</a> → error 404</li>
      <li><a href="/api/health">API health</a> (JSON)</li>
    </ul>
  </div>
</main>
