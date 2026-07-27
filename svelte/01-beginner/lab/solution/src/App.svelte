<script lang="ts">
  import TaskColumn from './components/TaskColumn.svelte';
  import TaskForm from './components/TaskForm.svelte';
  import { board, tasksByStatus } from './lib/board.svelte';
  import { STATUS_LABEL } from './lib/types';

  const total = $derived(board.tasks.length);
  const todoTasks = $derived(tasksByStatus('todo'));
  const doingTasks = $derived(tasksByStatus('doing'));
  const doneTasks = $derived(tasksByStatus('done'));

  $effect(() => {
    console.log(`[board] total tasks = ${total}`);
  });
</script>

<main>
  <header class="hero">
    <div>
      <p class="eyebrow">Svelte 5 · Beginner Lab</p>
      <h1>Task Board</h1>
      <p class="sub">Kanban ง่าย ๆ ด้วย $state / $derived และ snippets</p>
    </div>
    <p class="count">{total} tasks</p>
  </header>

  <TaskForm />

  <div class="board">
    <TaskColumn tasks={todoTasks}>
      {#snippet header({ count })}
        <div class="col-head">
          <h2>{STATUS_LABEL.todo}</h2>
          <span>{count}</span>
        </div>
      {/snippet}
    </TaskColumn>

    <TaskColumn tasks={doingTasks}>
      {#snippet header({ count })}
        <div class="col-head">
          <h2>{STATUS_LABEL.doing}</h2>
          <span>{count}</span>
        </div>
      {/snippet}
    </TaskColumn>

    <TaskColumn tasks={doneTasks}>
      {#snippet header({ count })}
        <div class="col-head">
          <h2>{STATUS_LABEL.done}</h2>
          <span>{count}</span>
        </div>
      {/snippet}
    </TaskColumn>
  </div>
</main>

<style>
  .hero {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
  }

  .eyebrow {
    margin: 0 0 0.25rem;
    color: #0f766e;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-size: clamp(1.6rem, 3vw, 2rem);
    color: #0f172a;
  }

  .sub {
    margin: 0.35rem 0 0;
    color: #64748b;
  }

  .count {
    margin: 0;
    background: #ccfbf1;
    color: #115e59;
    font-weight: 600;
    border-radius: 999px;
    padding: 0.35rem 0.85rem;
  }

  .board {
    display: grid;
    gap: 0.85rem;
    margin-top: 1.25rem;
  }

  @media (min-width: 860px) {
    .board {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .col-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }

  .col-head h2 {
    margin: 0;
    font-size: 0.95rem;
    color: #1e293b;
  }

  .col-head span {
    font-size: 0.8rem;
    background: #fff;
    color: #475569;
    border-radius: 999px;
    padding: 0.15rem 0.5rem;
    border: 1px solid #cbd5e1;
  }
</style>
