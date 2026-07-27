<script setup>
import { ref, computed, onMounted, onUnmounted, onUpdated } from 'vue'

const form = ref({
  title: '',
  priority: 'medium',
  done: false,
})

const tasks = ref([
  { id: 1, title: 'อ่าน README Reactivity', priority: 'high', done: true },
  { id: 2, title: 'ลอง watchEffect', priority: 'medium', done: false },
])

const filter = ref('all') // all | open | done
const mountInfo = ref('')
const updateCount = ref(0)

const visible = computed(() => {
  if (filter.value === 'open') return tasks.value.filter((t) => !t.done)
  if (filter.value === 'done') return tasks.value.filter((t) => t.done)
  return tasks.value
})

function addTask() {
  const title = form.value.title.trim()
  if (!title) return
  tasks.value.push({
    id: Date.now(),
    title,
    priority: form.value.priority,
    done: false,
  })
  form.value.title = ''
}

function toggle(id) {
  const t = tasks.value.find((x) => x.id === id)
  if (t) t.done = !t.done
}

function onKey(e) {
  if (e.key === '?') {
    mountInfo.value = `Window: ${window.innerWidth}px · updates: ${updateCount.value}`
  }
}

onMounted(() => {
  mountInfo.value = `mounted @ ${new Date().toLocaleTimeString()}`
  window.addEventListener('keydown', onKey)
})

onUpdated(() => {
  updateCount.value += 1
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <main class="page">
    <h1>Forms · v-if / v-for · Lifecycle</h1>
    <p class="meta">{{ mountInfo }} (กด <kbd>?</kbd> เพื่อ refresh)</p>

    <form class="form" @submit.prevent="addTask">
      <input v-model.trim="form.title" placeholder="งานใหม่" />
      <select v-model="form.priority">
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
      <button type="submit">Add</button>
    </form>

    <div class="filters">
      <button
        v-for="f in ['all', 'open', 'done']"
        :key="f"
        type="button"
        :class="{ active: filter === f }"
        @click="filter = f"
      >
        {{ f }}
      </button>
    </div>

    <p v-if="visible.length === 0" class="empty">ไม่มีรายการ</p>

    <ul v-else>
      <li v-for="task in visible" :key="task.id" :class="{ done: task.done }">
        <label>
          <input type="checkbox" :checked="task.done" @change="toggle(task.id)" />
          <span>{{ task.title }}</span>
          <small>{{ task.priority }}</small>
        </label>
      </li>
    </ul>

    <p v-show="updateCount > 0" class="meta">
      onUpdated fired ≈ {{ updateCount }} times
    </p>
  </main>
</template>

<style>
.page {
  font-family: ui-sans-serif, system-ui, sans-serif;
  max-width: 36rem;
  margin: 2rem auto;
  padding: 0 1rem;
}
.form {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}
.form input {
  flex: 1;
  padding: 0.4rem 0.5rem;
}
.filters button {
  margin-right: 0.35rem;
  cursor: pointer;
}
.filters .active {
  font-weight: 700;
}
.done span {
  text-decoration: line-through;
  opacity: 0.6;
}
.meta {
  color: #555;
  font-size: 0.9rem;
}
.empty {
  color: #888;
}
kbd {
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 0 0.3rem;
}
li {
  list-style: none;
  margin: 0.4rem 0;
}
ul {
  padding: 0;
}
small {
  margin-left: 0.5rem;
  color: #666;
}
</style>
