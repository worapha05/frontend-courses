<script setup>
const { data } = await useFetch('/api/hello', { key: 'hello' })
const doubled = useDoubler(3)
</script>

<template>
  <main>
    <h1>Nuxt Architecture</h1>
    <p>Auto-imported composable: 3 × 2 = <strong>{{ doubled }}</strong></p>
    <GreetingBanner :message="data?.message ?? '…'" />
    <p class="hint">
      ไฟล์นี้มาจาก <code>pages/index.vue</code> → route <code>/</code>
    </p>
  </main>
</template>

<style scoped>
.hint {
  color: #555;
  font-size: 0.9rem;
}
code {
  background: #f3f3f3;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
}
</style>
