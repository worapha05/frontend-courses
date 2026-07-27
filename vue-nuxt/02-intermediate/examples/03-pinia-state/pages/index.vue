<script setup>
const cart = useCartStore()

const catalog = [
  { id: 1, name: 'Mechanical Keyboard', price: 2890 },
  { id: 2, name: 'Quiet Mouse', price: 990 },
  { id: 3, name: 'USB-C Hub', price: 1290 },
]
</script>

<template>
  <main>
    <h1>Catalog</h1>
    <p>In cart: {{ cart.count }} items · ฿{{ cart.total }}</p>
    <ul>
      <li v-for="p in catalog" :key="p.id">
        {{ p.name }} — ฿{{ p.price }}
        <button type="button" @click="cart.add(p)">Add</button>
      </li>
    </ul>
  </main>
</template>

<style scoped>
li {
  margin: 0.5rem 0;
}
button {
  margin-left: 0.5rem;
  cursor: pointer;
}
</style>
