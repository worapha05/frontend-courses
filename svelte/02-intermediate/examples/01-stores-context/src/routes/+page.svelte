<script lang="ts">
  import { getContext } from 'svelte';
  import { cart } from '$lib/stores/cart';
  import { theme, type ThemeMode } from '$lib/stores/theme';

  type ThemeApi = {
    mode: ThemeMode;
    subscribe: (run: (value: ThemeMode) => void) => () => void;
    toggle: () => void;
  };

  const themeApi = getContext<ThemeApi>('theme');

  const products = [
    { id: 'p1', name: 'หูฟังไร้สาย', price: 1290 },
    { id: 'p2', name: 'คีย์บอร์ดกลไก', price: 2490 },
    { id: 'p3', name: 'เมาส์เออร์โก', price: 890 },
    { id: 'p4', name: 'ขาตั้งโน้ตบุ๊ก', price: 590 }
  ];
</script>

<svelte:head>
  <title>สินค้า — Stores & Context</title>
</svelte:head>

<main>
  <h1>รายการสินค้า</h1>
  <p class="muted">
    เพิ่มสินค้าเข้า custom cart store · ธีมมาจาก
    <code>getContext('theme')</code>
    (โหมดปัจจุบัน: {$theme})
  </p>

  <div class="grid" style="margin-top: 1.25rem">
    {#each products as product (product.id)}
      <article class="card product">
        <div>
          <strong>{product.name}</strong>
          <div class="price">฿{product.price.toLocaleString('th-TH')}</div>
        </div>
        <button type="button" onclick={() => cart.add(product)}>เพิ่มลงตะกร้า</button>
      </article>
    {/each}
  </div>

  <p class="muted" style="margin-top: 1.5rem">
    Context toggle ก็ใช้ได้เช่นกัน:
    <button class="ghost" type="button" onclick={() => themeApi.toggle()}>สลับธีมจาก context</button>
  </p>
</main>
