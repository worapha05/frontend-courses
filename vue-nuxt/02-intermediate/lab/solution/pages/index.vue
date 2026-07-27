<script setup>
const { q, category } = useProductFilters()

const { data, pending, error } = await useFetch('/api/products', {
  key: 'catalog',
  query: { q, category },
  watch: [q, category],
})
</script>

<template>
  <main>
    <h1>Catalog</h1>
    <div class="filters">
      <input v-model="q" placeholder="ค้นหาสินค้า…" />
      <select v-model="category">
        <option value="all">all</option>
        <option value="gear">gear</option>
        <option value="desk">desk</option>
        <option value="audio">audio</option>
      </select>
    </div>

    <p v-if="pending">Loading…</p>
    <p v-else-if="error" class="err">{{ error.message }}</p>
    <div v-else class="grid">
      <ProductCard
        v-for="p in data?.items ?? []"
        :key="p.id"
        :product="p"
      />
    </div>
  </main>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 0.85rem;
}
.err {
  color: #b00020;
}
input,
select {
  padding: 0.4rem 0.55rem;
  font: inherit;
}
</style>
