<script setup>
import { ref } from 'vue'

defineProps({
  name: { type: String, required: true },
  role: { type: String, default: 'guest' },
})

const emit = defineEmits(['submit'])
const hintOpen = ref(true)

function close() {
  hintOpen.value = false
}

function submit() {
  emit('submit', { at: new Date().toISOString() })
}
</script>

<template>
  <article class="card">
    <header>
      <slot name="header" />
    </header>

    <p>{{ name }} · <em>{{ role }}</em></p>

    <div class="body">
      <slot />
    </div>

    <p v-if="hintOpen" class="hint">
      Scoped slot สามารถส่งฟังก์ชันกลับไปให้ parent ได้
    </p>

    <footer>
      <slot name="footer" :close="close" />
      <button type="button" @click="submit">Emit submit</button>
    </footer>
  </article>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}
.hint {
  font-size: 0.9rem;
  opacity: 0.8;
}
footer {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.75rem;
}
</style>
