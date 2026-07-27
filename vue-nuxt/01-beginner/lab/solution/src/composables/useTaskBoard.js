import { ref, computed, watch, readonly } from 'vue';

const STATUSES = ['todo', 'doing', 'done'];
const NEXT = { todo: 'doing', doing: 'done', done: 'done' };

export function useTaskBoard() {
  const tasks = ref([
    {
      id: 1,
      title: 'อ่าน Reactivity README',
      priority: 'high',
      status: 'done',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'ทำ Lab Task Board',
      priority: 'high',
      status: 'doing',
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: 'ลอง provide/inject',
      priority: 'medium',
      status: 'todo',
      createdAt: new Date().toISOString(),
    },
  ]);

  const priorityFilter = ref('all');

  const filtered = computed(() => {
    if (priorityFilter.value === 'all') return tasks.value;
    return tasks.value.filter((t) => t.priority === priorityFilter.value);
  });

  const byStatus = computed(() => {
    const groups = { todo: [], doing: [], done: [] };
    for (const task of filtered.value) {
      groups[task.status].push(task);
    }
    return groups;
  });

  const stats = computed(() => ({
    todo: byStatus.value.todo.length,
    doing: byStatus.value.doing.length,
    done: byStatus.value.done.length,
    total: filtered.value.length,
  }));

  const doneCount = computed(() => stats.value.done);

  watch(doneCount, (next, prev) => {
    console.log(`[task-board] done: ${prev} → ${next}`);
  });

  function addTask({ title, priority }) {
    const trimmed = title.trim();
    if (!trimmed) return;
    tasks.value.push({
      id: Date.now(),
      title: trimmed,
      priority,
      status: 'todo',
      createdAt: new Date().toISOString(),
    });
  }

  function moveNext(id) {
    const task = tasks.value.find((t) => t.id === id);
    if (!task) return;
    task.status = NEXT[task.status];
  }

  function toggleDone(id) {
    const task = tasks.value.find((t) => t.id === id);
    if (!task) return;
    task.status = task.status === 'done' ? 'todo' : 'done';
  }

  return {
    statuses: STATUSES,
    tasks: readonly(tasks),
    priorityFilter,
    byStatus,
    stats,
    addTask,
    moveNext,
    toggleDone,
  };
}
