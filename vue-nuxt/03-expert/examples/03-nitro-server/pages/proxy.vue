<script setup>
const limit = ref(5)
const { data, error, pending, refresh } = await useFetch('/api/proxy/posts', {
  key: 'proxy-posts',
  query: { limit },
  watch: [limit],
})
</script>

<template>
  <main>
    <h1>API Proxy</h1>
    <label>
      Limit
      <input v-model.number="limit" type="number" min="1" max="20" />
    </label>
    <button type="button" @click="refresh()">Reload</button>

    <p v-if="pending">Loading…</p>
    <p v-else-if="error" class="err">
      {{ error.statusCode }} — {{ error.statusMessage || error.message }}
    </p>
    <ul v-else>
      <li v-for="post in data?.items ?? []" :key="post.id">
        #{{ post.id }} {{ post.title }}
      </li>
    </ul>
  </main>
</template>

<style scoped>
.err {
  color: #b00020;
}
input {
  margin: 0 0.5rem;
  width: 4rem;
}
button {
  cursor: pointer;
}
</style>
