<script setup>
const { data, pending, refresh } = await useFetch('/api/news', {
  key: 'news-swr',
})
</script>

<template>
  <main>
    <h1>News (SWR)</h1>
    <p v-if="pending">Loading…</p>
    <template v-else>
      <p>Generated at: <strong>{{ data?.generatedAt }}</strong></p>
      <ul>
        <li v-for="item in data?.items ?? []" :key="item.id">
          {{ item.title }}
        </li>
      </ul>
      <button type="button" @click="refresh()">Refresh</button>
    </template>
    <p class="note">
      ด้วย <code>swr: 30</code> Nitro จะ cache response แล้ว revalidate หลัง 30 วินาที
    </p>
  </main>
</template>

<style scoped>
.note {
  margin-top: 1rem;
  color: #555;
  font-size: 0.9rem;
}
</style>
