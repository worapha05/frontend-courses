<script lang="ts">
  import { enhance } from '$app/forms';
  import { cart } from '$lib/stores/cart';

  let { form } = $props();

  const total = $derived($cart.reduce((sum, i) => sum + i.price * i.qty, 0));
  const itemsJson = $derived(JSON.stringify($cart));
</script>

<svelte:head>
  <title>ชำระเงิน — Bookshop</title>
</svelte:head>

<main>
  <h1>ชำระเงิน / สั่งซื้อ</h1>
  <p class="muted">Form Action ตรวจ name + email แล้วบันทึกออเดอร์ในหน่วยความจำ</p>

  {#if form?.success}
    <div class="success-box" style="margin-top: 1rem">
      <strong>สั่งซื้อสำเร็จ!</strong>
      <p style="margin: 0.35rem 0 0">
        เลขออเดอร์ <code>{form.orderId}</code> · ยอด
        ฿{Number(form.total).toLocaleString('th-TH')}
      </p>
      <p class="muted" style="margin: 0.5rem 0 0">
        <a href="/books">เลือกหนังสือต่อ</a>
      </p>
    </div>
  {:else}
    <div class="card" style="margin-top: 1rem">
      <h2 style="margin-top: 0; font-size: 1.05rem">สรุปตะกร้า</h2>
      {#if $cart.length === 0}
        <p class="muted">ตะกร้าว่าง — <a href="/books">ไปเลือกหนังสือ</a></p>
      {:else}
        {#each $cart as item (item.id)}
          <div class="row">
            <span>{item.title} × {item.qty}</span>
            <span class="price">
              ฿{(item.price * item.qty).toLocaleString('th-TH')}
            </span>
          </div>
        {/each}
        <div class="row">
          <strong>รวม</strong>
          <strong class="price">฿{total.toLocaleString('th-TH')}</strong>
        </div>
      {/if}

      {#if form?.errors?.items}
        <p class="error">{form.errors.items}</p>
      {/if}

      <form
        method="POST"
        action="?/place"
        use:enhance={() => {
          return async ({ result, update }) => {
            await update();
            if (result.type === 'success') {
              cart.clear();
            }
          };
        }}
        style="margin-top: 1.25rem"
      >
        <input type="hidden" name="items" value={itemsJson} />

        <div class="field">
          <label for="name">ชื่อผู้สั่ง</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form?.name ?? ''}
            aria-invalid={form?.errors?.name ? 'true' : undefined}
          />
          {#if form?.errors?.name}
            <p class="error">{form.errors.name}</p>
          {/if}
        </div>

        <div class="field">
          <label for="email">อีเมล</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form?.email ?? ''}
            aria-invalid={form?.errors?.email ? 'true' : undefined}
          />
          {#if form?.errors?.email}
            <p class="error">{form.errors.email}</p>
          {/if}
        </div>

        <button type="submit" disabled={$cart.length === 0}>ยืนยันสั่งซื้อ</button>
      </form>
    </div>
  {/if}
</main>
