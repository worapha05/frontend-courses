<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['create'])

const draft = reactive({
  title: '',
  priority: 'medium',
})

function submit() {
  emit('create', { title: draft.title, priority: draft.priority })
  draft.title = ''
  draft.priority = 'medium'
}
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <input v-model.trim="draft.title" placeholder="ชื่องานใหม่" required />
    <select v-model="draft.priority">
      <option value="low">low</option>
      <option value="medium">medium</option>
      <option value="high">high</option>
    </select>
    <button type="submit">Add task</button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}
input {
  flex: 1;
  min-width: 12rem;
  padding: 0.45rem 0.6rem;
}
select,
button {
  padding: 0.45rem 0.6rem;
}
</style>
