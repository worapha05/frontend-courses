<script setup>
defineProps({
  product: { type: Object, required: true },
})

const cart = useCartStore()
</script>

<template>
  <article class="card">
    <h2>
      <NuxtLink :to="`/products/${product.id}`">{{ product.name }}</NuxtLink>
    </h2>
    <p>{{ product.category }} · ฿{{ product.price }}</p>
    <button type="button" @click="cart.add(product)">Add to cart</button>
  </article>
</template>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #e2e5ea;
  border-radius: 12px;
  padding: 1rem;
}
h2 {
  margin: 0 0 0.35rem;
  font-size: 1.05rem;
}
a {
  color: inherit;
}
button {
  margin-top: 0.5rem;
  cursor: pointer;
  padding: 0.35rem 0.7rem;
}
</style>
