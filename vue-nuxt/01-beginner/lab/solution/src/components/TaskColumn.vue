<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  title: { type: String, required: true },
  tasks: { type: Array, required: true },
})

const emit = defineEmits(['move-next', 'toggle-done'])
</script>

<template>
  <section class="column">
    <h2>{{ title }} <small>({{ tasks.length }})</small></h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <TaskItem
          :task="task"
          @move-next="emit('move-next', task.id)"
          @toggle-done="emit('toggle-done', task.id)"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.column {
  background: color-mix(in srgb, Canvas 88%, CanvasText 4%);
  border: 1px solid color-mix(in srgb, CanvasText 12%, transparent);
  border-radius: 12px;
  padding: 0.85rem;
  min-height: 12rem;
}
h2 {
  margin: 0 0 0.75rem;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}
small {
  opacity: 0.6;
  font-weight: 500;
}
</style>
