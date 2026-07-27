<script lang="ts">
  import { createTask } from '../lib/board.svelte';
  import type { Priority } from '../lib/types';

  let title = $state('');
  let priority = $state<Priority>('medium');

  function submit(e: Event) {
    e.preventDefault();
    if (!title.trim()) return;
    createTask(title, priority);
    title = '';
    priority = 'medium';
  }
</script>

<form class="form" onsubmit={submit}>
  <div class="field grow">
    <label for="task-title">ชื่องาน</label>
    <input
      id="task-title"
      bind:value={title}
      placeholder="เช่น เขียน LAB…"
      maxlength="80"
      required
    />
  </div>

  <div class="field">
    <label for="task-priority">Priority</label>
    <select id="task-priority" bind:value={priority}>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </div>

  <button type="submit" disabled={!title.trim()}>เพิ่มงาน</button>
</form>

<style>
  .form {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: end;
    background: #fff;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    padding: 1rem 1.1rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .grow {
    flex: 1 1 200px;
  }

  label {
    font-size: 0.85rem;
    color: #475569;
  }

  input,
  select {
    font: inherit;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 0.5rem 0.7rem;
    background: #f8fafc;
    color: #0f172a;
  }

  input:focus,
  select:focus {
    outline: 2px solid #5eead4;
    border-color: #0d9488;
  }

  button {
    font: inherit;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    padding: 0.55rem 1rem;
    background: #0d9488;
    color: #fff;
    font-weight: 600;
  }

  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
</style>
