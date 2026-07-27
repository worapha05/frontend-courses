<script lang="ts">
  import { cart } from '$lib/stores/cart';
  import { toasts } from '$lib/stores/toast';

  let { data } = $props();

  function addToCart() {
    cart.add({
      id: data.book.id,
      title: data.book.title,
      price: data.book.price
    });
    toasts.push(`เพิ่ม “${data.book.title}” ลงตะกร้าแล้ว`);
  }
</script>

<svelte:head>
  <title>{data.book.title} — Bookshop</title>
</svelte:head>

<main>
  <p><a href="/books">← กลับรายการหนังสือ</a></p>

  <article class="card" style="margin-top: 0.75rem">
    <span class="category">{data.book.category}</span>
    <h1 style="margin: 0.35rem 0">{data.book.title}</h1>
    <p class="muted">โดย {data.book.author}</p>
    <p class="price" style="font-size: 1.25rem">
      ฿{data.book.price.toLocaleString('th-TH')}
    </p>
    <p>{data.book.description}</p>

    <div class="actions">
      <button type="button" onclick={addToCart}>เพิ่มลงตะกร้า</button>
      <a class="btn ghost" href="/cart">ดูตะกร้า</a>
    </div>
  </article>
</main>
