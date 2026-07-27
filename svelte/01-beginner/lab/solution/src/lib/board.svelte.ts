import { nextStatus, type Priority, type Task, type TaskStatus } from './types';

function seed(): Task[] {
  return [
    {
      id: crypto.randomUUID(),
      title: 'อ่าน README Beginner',
      priority: 'high',
      status: 'todo',
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: 'ลอง example runes',
      priority: 'medium',
      status: 'doing',
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: 'ตั้งค่า Vite + Svelte 5',
      priority: 'low',
      status: 'done',
      createdAt: new Date().toISOString(),
    },
  ];
}

/** Board state เป็น .svelte.ts module — source of truth เดียว */
export const board = $state<{ tasks: Task[] }>({
  tasks: seed(),
});

/**
 * Svelte ห้าม export $derived จาก module โดยตรง
 * ให้ export function ที่คืนค่าปัจจุบัน แล้วห่อด้วย $derived ใน component
 */
export function tasksByStatus(status: TaskStatus) {
  return board.tasks.filter((t) => t.status === status);
}

export function createTask(title: string, priority: Priority) {
  const trimmed = title.trim();
  if (!trimmed) return;

  board.tasks.push({
    id: crypto.randomUUID(),
    title: trimmed,
    priority,
    status: 'todo',
    createdAt: new Date().toISOString(),
  });
}

export function moveTask(id: string, status: TaskStatus) {
  const task = board.tasks.find((t) => t.id === id);
  if (!task) return;
  task.status = status;
}

export function advanceTask(id: string) {
  const task = board.tasks.find((t) => t.id === id);
  if (!task) return;
  const next = nextStatus(task.status);
  if (next) task.status = next;
}

export function toggleDone(id: string) {
  const task = board.tasks.find((t) => t.id === id);
  if (!task) return;
  task.status = task.status === 'done' ? 'todo' : 'done';
}

export function removeTask(id: string) {
  const index = board.tasks.findIndex((t) => t.id === id);
  if (index !== -1) board.tasks.splice(index, 1);
}
