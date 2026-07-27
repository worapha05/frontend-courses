<script setup>
import { ref, provide } from 'vue'
import UserCard from './components/UserCard.vue'
import TextField from './components/TextField.vue'
import ThemeBadge from './components/ThemeBadge.vue'

const theme = ref('light')
provide('app-theme', theme)

const displayName = ref('Worapha')
const lastSubmitted = ref(null)

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function onSubmit(payload) {
  lastSubmitted.value = payload
}
</script>

<template>
  <main :class="['page', theme]">
    <h1>Props · Emit · Slots · Provide/Inject</h1>

    <button type="button" @click="toggleTheme">
      Toggle theme ({{ theme }})
    </button>

    <ThemeBadge />

    <UserCard :name="displayName" role="learner" @submit="onSubmit">
      <template #header>
        <h2>Profile Card</h2>
      </template>

      <TextField v-model="displayName" label="Display name" />

      <template #footer="{ close }">
        <button type="button" @click="close">Close hint</button>
      </template>
    </UserCard>

    <p v-if="lastSubmitted">
      Last submit: {{ lastSubmitted }}
    </p>
  </main>
</template>

<style>
.page {
  font-family: ui-sans-serif, system-ui, sans-serif;
  max-width: 36rem;
  margin: 2rem auto;
  padding: 1rem;
  min-height: 100vh;
}
.page.dark {
  background: #111;
  color: #f5f5f5;
}
button {
  cursor: pointer;
  margin: 0.25rem 0.25rem 1rem 0;
  padding: 0.4rem 0.75rem;
}
</style>
