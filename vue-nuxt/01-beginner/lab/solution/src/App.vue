<script setup>
import { provide, ref } from 'vue'
import { useTaskBoard } from './composables/useTaskBoard.js'
import TaskColumn from './components/TaskColumn.vue'
import TaskForm from './components/TaskForm.vue'

const theme = ref('light')
provide('theme', theme)

const {
  statuses,
  priorityFilter,
  byStatus,
  stats,
  addTask,
  moveNext,
  toggleDone,
} = useTaskBoard()

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <main :class="['board', theme]">
    <header class="top">
      <div>
        <h1>Reactive Task Board</h1>
        <p class="stats">
          todo {{ stats.todo }} · doing {{ stats.doing }} · done {{ stats.done }}
          (แสดง {{ stats.total }})
        </p>
      </div>
      <div class="controls">
        <label>
          Priority
          <select v-model="priorityFilter">
            <option value="all">all</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </label>
        <button type="button" @click="toggleTheme">Theme: {{ theme }}</button>
      </div>
    </header>

    <TaskForm @create="addTask" />

    <div class="columns">
      <TaskColumn
        v-for="status in statuses"
        :key="status"
        :title="status"
        :tasks="byStatus[status]"
        @move-next="moveNext"
        @toggle-done="toggleDone"
      />
    </div>
  </main>
</template>

<style>
:root {
  color-scheme: light dark;
}
body {
  margin: 0;
}
.board {
  min-height: 100vh;
  font-family: 'Segoe UI', ui-sans-serif, system-ui, sans-serif;
  padding: 1.5rem;
  background: linear-gradient(160deg, #f7fafc, #e8eef5);
  color: #1a202c;
}
.board.dark {
  background: linear-gradient(160deg, #0f172a, #1e293b);
  color: #e2e8f0;
}
.top {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: flex-start;
}
.stats {
  opacity: 0.75;
  margin: 0.25rem 0 0;
}
.controls {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}
.columns {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.25rem;
}
button,
select,
input {
  font: inherit;
}
button {
  cursor: pointer;
}
@media (max-width: 800px) {
  .columns {
    grid-template-columns: 1fr;
  }
}
</style>
