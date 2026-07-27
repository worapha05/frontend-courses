<script setup>
const route = useRoute()
const cart = useCartStore()
const id = computed(() => String(route.params.id))

const { data: product, error, pending } = await useAsyncData(
  () => `product-${id.value}`,
  () => $fetch(`/api/products/${id.value}`),
  { watch: [id] },
)
</script>

<template>
  <main>
    <p v-if="pending">Loading…</p>
    <p v-else-if="error" class="err">
      {{ error.statusCode }} — {{ error.statusMessage || error.message }}
    </p>
    <template v-else-if="product">
      <h1>{{ product.name }}</h1>
      <p>{{ product.description }}</p>
      <p>Category: {{ product.category }} · Stock: {{ product.stock }}</p>
      <p><strong>฿{{ product.price }}</strong></p>
      <button type="button" @click="cart.add(product)">Add to cart</button>
      <p><NuxtLink to="/">← Back</NuxtLink></p>
    </template>
  </main>
</template>

<style scoped>
.err {
  color: #b00020;
}
button {
  cursor: pointer;
  padding: 0.4rem 0.8rem;
}
</style>
