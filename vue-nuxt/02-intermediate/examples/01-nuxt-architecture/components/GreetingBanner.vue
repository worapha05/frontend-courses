<script setup>
defineProps({
  message: { type: String, required: true },
})
</script>

<template>
  <aside class="banner">
    {{ message }}
  </aside>
</template>

<style scoped>
.banner {
  border: 1px dashed #888;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}
</style>
