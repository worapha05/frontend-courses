<script setup>
const cart = useCartStore()
</script>

<template>
  <main>
    <h1>Cart</h1>
    <p class="note">หน้านี้เป็น CSR (<code>ssr: false</code>)</p>
    <p v-if="cart.items.length === 0">ยังไม่มีสินค้าในตะกร้า</p>
    <ul v-else>
      <li v-for="item in cart.items" :key="item.id">
        {{ item.name }} × {{ item.qty }} = ฿{{ item.price * item.qty }}
        <button type="button" @click="cart.remove(item.id)">Remove</button>
      </li>
    </ul>
    <p v-if="cart.items.length">
      <strong>Total: ฿{{ cart.total }}</strong>
    </p>
    <button v-if="cart.items.length" type="button" @click="cart.clear()">
      Clear cart
    </button>
  </main>
</template>

<style scoped>
.note {
  color: #555;
  font-size: 0.9rem;
}
li {
  margin: 0.4rem 0;
}
button {
  margin-left: 0.5rem;
  cursor: pointer;
}
</style>
