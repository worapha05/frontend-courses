<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Task } from '../lib/types';
  import TaskItem from './TaskItem.svelte';

  interface Props {
    tasks: Task[];
    /** snippet สำหรับหัวคอลัมน์ — ส่ง title + count จาก parent */
    header: Snippet<[{ count: number }]>;
  }

  let { tasks, header }: Props = $props();
</script>

<section class="column">
  <header>
    {@render header({ count: tasks.length })}
  </header>

  <div class="list">
    {#each tasks as task (task.id)}
      <TaskItem {task} />
    {:else}
      <p class="empty">ยังไม่มีงาน</p>
    {/each}
  </div>
</section>

<style>
  .column {
    background: #e2e8f0;
    border-radius: 14px;
    padding: 0.75rem;
    min-height: 280px;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  header {
    padding: 0.25rem 0.35rem 0.15rem;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    flex: 1;
  }

  .empty {
    margin: 0;
    text-align: center;
    color: #64748b;
    font-size: 0.9rem;
    padding: 1.5rem 0.5rem;
  }
</style>
