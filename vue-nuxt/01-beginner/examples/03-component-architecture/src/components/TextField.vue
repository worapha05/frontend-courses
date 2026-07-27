<script setup>
defineProps({
  modelValue: { type: String, required: true },
  label: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="field">
    <span>{{ label }}</span>
    <input
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0.75rem 0;
}
input {
  padding: 0.4rem 0.5rem;
}
</style>
