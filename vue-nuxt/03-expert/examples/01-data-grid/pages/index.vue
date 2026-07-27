<script setup>
const { data, pending } = await useFetch('/api/orders', { key: 'orders-grid' })
const rows = computed(() => data.value?.items ?? [])

const {
  filters,
  sorts,
  page,
  pageCount,
  pageRows,
  sorted,
  toggleSort,
  exportCsv,
} = useDataGrid({
  rows,
  searchKeys: ['id', 'customer', 'status', 'region'],
  pageSize: 20,
})

function sortLabel(key) {
  const s = sorts.value.find((x) => x.key === key)
  if (!s) return ''
  return s.dir === 'asc' ? '↑' : '↓'
}
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-8">
    <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Orders Data Grid</h1>
        <p class="mt-1 text-sm text-slate-600">
          {{ sorted.length.toLocaleString() }} rows after filter · headless + Tailwind
        </p>
      </div>
      <button
        type="button"
        class="rounded-md bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700"
        @click="exportCsv('orders-filtered.csv')"
      >
        Export CSV
      </button>
    </div>

    <div class="mb-4 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-5">
      <label class="text-sm">
        <span class="mb-1 block text-slate-500">Search</span>
        <input
          v-model="filters.q"
          class="w-full rounded-md border border-slate-300 px-2 py-1.5"
          placeholder="id / customer / region"
        />
      </label>
      <label class="text-sm">
        <span class="mb-1 block text-slate-500">Status</span>
        <select v-model="filters.status" class="w-full rounded-md border border-slate-300 px-2 py-1.5">
          <option value="all">all</option>
          <option value="pending">pending</option>
          <option value="paid">paid</option>
          <option value="shipped">shipped</option>
          <option value="cancelled">cancelled</option>
        </select>
      </label>
      <label class="text-sm">
        <span class="mb-1 block text-slate-500">Region</span>
        <select v-model="filters.region" class="w-full rounded-md border border-slate-300 px-2 py-1.5">
          <option value="all">all</option>
          <option value="BKK">BKK</option>
          <option value="CNX">CNX</option>
          <option value="KKU">KKU</option>
          <option value="HKT">HKT</option>
          <option value="HDY">HDY</option>
        </select>
      </label>
      <label class="text-sm">
        <span class="mb-1 block text-slate-500">Min amount</span>
        <input
          v-model.number="filters.minAmount"
          type="number"
          class="w-full rounded-md border border-slate-300 px-2 py-1.5"
        />
      </label>
      <label class="text-sm">
        <span class="mb-1 block text-slate-500">Max amount</span>
        <input
          v-model.number="filters.maxAmount"
          type="number"
          class="w-full rounded-md border border-slate-300 px-2 py-1.5"
        />
      </label>
    </div>

    <p v-if="pending" class="text-slate-500">Loading…</p>

    <div v-else class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table class="min-w-full text-left text-sm">
        <thead class="bg-slate-50 text-slate-600">
          <tr>
            <th
              v-for="col in [
                ['id', 'ID'],
                ['customer', 'Customer'],
                ['status', 'Status'],
                ['amount', 'Amount'],
                ['region', 'Region'],
                ['createdAt', 'Created'],
              ]"
              :key="col[0]"
              class="cursor-pointer select-none px-3 py-2 font-medium hover:text-slate-900"
              @click="toggleSort(col[0], $event.shiftKey)"
            >
              {{ col[1] }} {{ sortLabel(col[0]) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in pageRows"
            :key="row.id"
            class="border-t border-slate-100 hover:bg-slate-50"
          >
            <td class="px-3 py-2 font-mono text-xs">{{ row.id }}</td>
            <td class="px-3 py-2">{{ row.customer }}</td>
            <td class="px-3 py-2">{{ row.status }}</td>
            <td class="px-3 py-2">฿{{ row.amount.toFixed(2) }}</td>
            <td class="px-3 py-2">{{ row.region }}</td>
            <td class="px-3 py-2">{{ row.createdAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4 flex items-center justify-between text-sm">
      <button
        type="button"
        class="rounded-md border border-slate-300 bg-white px-3 py-1.5 disabled:opacity-40"
        :disabled="page <= 1"
        @click="page--"
      >
        Prev
      </button>
      <span>Page {{ page }} / {{ pageCount }}</span>
      <button
        type="button"
        class="rounded-md border border-slate-300 bg-white px-3 py-1.5 disabled:opacity-40"
        :disabled="page >= pageCount"
        @click="page++"
      >
        Next
      </button>
    </div>
    <p class="mt-3 text-xs text-slate-500">
      Tip: กด Shift+คลิกหัวคอลัมน์ เพื่อ multi-column sort
    </p>
  </main>
</template>
