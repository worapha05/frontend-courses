<script lang="ts">
  import { advanceTask, removeTask, toggleDone } from '../lib/board.svelte';
  import { nextStatus, type Task } from '../lib/types';

  interface Props {
    task: Task;
  }

  let { task }: Props = $props();

  const canAdvance = $derived(nextStatus(task.status) !== null);
</script>

<article class="item" data-priority={task.priority}>
  <label class="check">
    <input
      type="checkbox"
      checked={task.status === 'done'}
      onchange={() => toggleDone(task.id)}
    />
    <span class:done={task.status === 'done'}>{task.title}</span>
  </label>

  <div class="meta">
    <span class="badge">{task.priority}</span>
    <div class="actions">
      {#if canAdvance}
        <button type="button" onclick={() => advanceTask(task.id)}>Next →</button>
      {/if}
      <button type="button" class="ghost" onclick={() => removeTask(task.id)}>ลบ</button>
    </div>
  </div>
</article>

<style>
  .item {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-left: 3px solid #94a3b8;
    border-radius: 10px;
    padding: 0.75rem 0.85rem;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .item[data-priority='low'] {
    border-left-color: #64748b;
  }

  .item[data-priority='medium'] {
    border-left-color: #0d9488;
  }

  .item[data-priority='high'] {
    border-left-color: #ea580c;
  }

  .check {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    cursor: pointer;
  }

  .check input {
    margin-top: 0.2rem;
  }

  .done {
    text-decoration: line-through;
    color: #94a3b8;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .badge {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    background: #f1f5f9;
    color: #475569;
    border-radius: 6px;
    padding: 0.15rem 0.45rem;
  }

  .actions {
    display: flex;
    gap: 0.35rem;
  }

  button {
    font: inherit;
    font-size: 0.8rem;
    cursor: pointer;
    border: 1px solid #cbd5e1;
    background: #f8fafc;
    border-radius: 6px;
    padding: 0.25rem 0.5rem;
    color: #334155;
  }

  button.ghost {
    border-color: transparent;
    background: transparent;
    color: #b91c1c;
  }
</style>
