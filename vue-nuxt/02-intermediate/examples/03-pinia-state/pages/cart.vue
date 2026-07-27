<script setup>
const cart = useCartStore()
</script>

<template>
  <main>
    <h1>Cart</h1>
    <p v-if="cart.items.length === 0">ตะกร้าว่าง</p>
    <ul v-else>
      <li v-for="item in cart.items" :key="item.id">
        {{ item.name }} × {{ item.qty }} = ฿{{ item.price * item.qty }}
        <button type="button" @click="cart.remove(item.id)">Remove</button>
      </li>
    </ul>
    <p v-if="cart.items.length"><strong>Total: ฿{{ cart.total }}</strong></p>
    <button v-if="cart.items.length" type="button" @click="cart.clear()">
      Clear
    </button>
  </main>
</template>
