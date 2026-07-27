<script setup>
import { inject } from 'vue'

defineProps({
  task: { type: Object, required: true },
})

const emit = defineEmits(['move-next', 'toggle-done'])
const theme = inject('theme', 'light')
</script>

<template>
  <article :class="['item', theme]">
    <label>
      <input
        type="checkbox"
        :checked="task.status === 'done'"
        @change="emit('toggle-done')"
      />
      <span>{{ task.title }}</span>
    </label>
    <div class="meta">
      <span class="prio">{{ task.priority }}</span>
      <button
        v-if="task.status !== 'done'"
        type="button"
        @click="emit('move-next')"
      >
        Move →
      </button>
    </div>
  </article>
</template>

<style scoped>
.item {
  border: 1px solid color-mix(in srgb, CanvasText 14%, transparent);
  border-radius: 8px;
  padding: 0.6rem 0.7rem;
  background: Canvas;
}
.item.dark {
  background: #0b1220;
}
label {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}
.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.45rem;
  font-size: 0.8rem;
}
.prio {
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.7;
}
button {
  padding: 0.2rem 0.5rem;
}
</style>
