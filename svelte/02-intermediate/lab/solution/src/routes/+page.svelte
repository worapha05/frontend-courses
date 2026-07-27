<script lang="ts">
  // homepage — no server data required
</script>

<svelte:head>
  <title>หน้าแรก — Bookshop</title>
</svelte:head>

<main class="hero">
  <h1>ร้านหนังสือออนไลน์ขนาดเล็ก</h1>
  <p class="muted">
    Lab Intermediate · stores + load + Form Actions + transitions
  </p>

  <div class="card" style="margin-top: 1.25rem">
    <p>เริ่มจากเลือกหนังสือ แล้วเพิ่มลงตะกร้า ก่อนไปหน้าชำระเงิน</p>
    <div class="actions">
      <a class="btn" href="/books">ดูหนังสือ</a>
      <a class="btn ghost" href="/cart">เปิดตะกร้า</a>
    </div>
  </div>
</main>
