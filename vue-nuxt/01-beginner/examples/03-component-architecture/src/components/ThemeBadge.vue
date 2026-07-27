<script setup>
import { inject, ref } from 'vue'

const theme = inject('app-theme', ref('light'))
</script>

<template>
  <p class="badge">
    ThemeBadge inject: <strong>{{ theme }}</strong>
  </p>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: #e8e8e8;
  color: #111;
  font-size: 0.9rem;
}
</style>
