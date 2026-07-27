<script setup>
const { data, pending, refresh } = await useFetch('/api/report', {
  key: 'nitro-report',
})
</script>

<template>
  <main>
    <h1>Cached Report</h1>
    <p v-if="pending">Loading…</p>
    <template v-else>
      <p>generatedAt: <strong>{{ data?.generatedAt }}</strong></p>
      <p>hits simulated: {{ data?.hits }}</p>
      <pre>{{ data?.summary }}</pre>
      <button type="button" @click="refresh()">Refresh</button>
      <p class="hint">
        ภายใน 15 วินาที generatedAt จะไม่เปลี่ยน เพราะ Nitro cache
      </p>
    </template>
  </main>
</template>

<style scoped>
.hint {
  color: #555;
  font-size: 0.9rem;
}
button {
  cursor: pointer;
  margin: 0.5rem 0;
}
</style>
