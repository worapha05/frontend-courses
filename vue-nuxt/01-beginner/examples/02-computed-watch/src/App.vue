<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const cart = ref([
  { id: 1, name: 'Keyboard', price: 1200, qty: 1 },
  { id: 2, name: 'Mouse', price: 450, qty: 2 },
])

const taxRate = ref(0.07)

const subtotal = computed(() =>
  cart.value.reduce((sum, i) => sum + i.price * i.qty, 0),
)

const tax = computed(() => Math.round(subtotal.value * taxRate.value))
const total = computed(() => subtotal.value + tax.value)

const logs = ref([])
function pushLog(msg) {
  logs.value = [`${new Date().toLocaleTimeString()} — ${msg}`, ...logs.value].slice(0, 8)
}

// watch: ระบุ source + ได้ค่าเก่า
watch(total, (next, prev) => {
  pushLog(`watch(total): ${prev} → ${next}`)
})

// watchEffect: auto-track ทุกค่าที่อ่าน
watchEffect((onCleanup) => {
  const label = `effect sees total=${total.value}, items=${cart.value.length}`
  pushLog(label)

  const t = setTimeout(() => {}, 0)
  onCleanup(() => clearTimeout(t))
})

function addItem() {
  cart.value.push({
    id: Date.now(),
    name: 'Cable',
    price: 99,
    qty: 1,
  })
}

function bumpQty(id) {
  const item = cart.value.find((i) => i.id === id)
  if (item) item.qty += 1
}
</script>

<template>
  <main class="page">
    <h1>computed · watch · watchEffect</h1>

    <section>
      <h2>Cart (computed)</h2>
      <ul>
        <li v-for="item in cart" :key="item.id">
          {{ item.name }} × {{ item.qty }} = {{ item.price * item.qty }}
          <button type="button" @click="bumpQty(item.id)">+qty</button>
        </li>
      </ul>
      <p>Subtotal: {{ subtotal }} | Tax: {{ tax }} | <strong>Total: {{ total }}</strong></p>
      <label>
        Tax rate
        <input v-model.number="taxRate" type="number" step="0.01" min="0" max="1" />
      </label>
      <button type="button" @click="addItem">Add cable</button>
    </section>

    <section>
      <h2>Effect log</h2>
      <ol>
        <li v-for="(line, i) in logs" :key="i">{{ line }}</li>
      </ol>
    </section>
  </main>
</template>

<style>
.page {
  font-family: ui-sans-serif, system-ui, sans-serif;
  max-width: 42rem;
  margin: 2rem auto;
  padding: 0 1rem;
}
section {
  border-top: 1px solid #ddd;
  padding: 1rem 0;
}
button {
  margin-left: 0.5rem;
  cursor: pointer;
}
input {
  margin-left: 0.5rem;
  width: 4rem;
}
</style>
