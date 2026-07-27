<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<div class="shell">
  <nav class="nav">
    <a class="brand" href="/">Routing & Load</a>
    <a href="/">หน้าแรก</a>
    <a href="/about">เกี่ยวกับ</a>
    <a href="/products">สินค้า</a>
    <a href="/api/health">/api/health</a>
  </nav>

  {@render children()}
</div>
