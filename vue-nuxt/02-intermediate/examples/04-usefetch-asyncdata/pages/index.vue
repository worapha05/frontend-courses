<script setup>
const q = ref('')
const category = ref('all')

const { data, pending, error, refresh } = await useFetch('/api/products', {
  key: 'products',
  query: { q, category },
  watch: [q, category],
})

const selectedId = ref<number | null>(null)

const { data: detail } = await useAsyncData(
  () => `product-${selectedId.value ?? 'none'}`,
  async () => {
    if (!selectedId.value) return null
    return await $fetch(`/api/products/${selectedId.value}`)
  },
  { watch: [selectedId] },
)
</script>

<template>
  <main>
    <h1>useFetch + useAsyncData</h1>

    <div class="filters">
      <input v-model="q" placeholder="ค้นหา…" />
      <select v-model="category">
        <option value="all">all</option>
        <option value="gear">gear</option>
        <option value="desk">desk</option>
      </select>
      <button type="button" @click="refresh()">Refresh</button>
    </div>

    <p v-if="pending">Loading…</p>
    <p v-else-if="error" class="err">{{ error.message }}</p>

    <ul v-else>
      <li v-for="p in data?.items ?? []" :key="p.id">
        <button type="button" class="linkish" @click="selectedId = p.id">
          {{ p.name }}
        </button>
        <small>{{ p.category }} · ฿{{ p.price }}</small>
      </li>
    </ul>

    <aside v-if="detail" class="detail">
      <h2>{{ detail.name }}</h2>
      <p>{{ detail.description }}</p>
      <p>Stock: {{ detail.stock }}</p>
    </aside>
  </main>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}
.err {
  color: #b00020;
}
.linkish {
  background: none;
  border: none;
  padding: 0;
  color: #0b57d0;
  cursor: pointer;
  text-decoration: underline;
  font: inherit;
}
.detail {
  margin-top: 1.25rem;
  border-top: 1px solid #ddd;
  padding-top: 1rem;
}
small {
  margin-left: 0.5rem;
  color: #666;
}
li {
  margin: 0.4rem 0;
}
</style>
