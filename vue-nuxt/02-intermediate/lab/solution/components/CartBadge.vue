<script setup>
const cart = useCartStore()
</script>

<template>
  <span class="badge">Cart ({{ cart.count }})</span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: #15202b;
  color: #fff;
  font-size: 0.85rem;
}
</style>
