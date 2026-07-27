export type Task = {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
};

let tasks: Task[] = [
  {
    id: crypto.randomUUID(),
    title: 'อ่านเอกสาร Form Actions',
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: 'ลอง use:enhance',
    done: true,
    createdAt: new Date().toISOString(),
  },
];

export function listTasks(): Task[] {
  return [...tasks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function createTask(title: string): Task {
  const task: Task = {
    id: crypto.randomUUID(),
    title,
    done: false,
    createdAt: new Date().toISOString(),
  };
  tasks = [task, ...tasks];
  return task;
}

export function toggleTask(id: string): Task | undefined {
  const task = tasks.find((t) => t.id === id);
  if (!task) return undefined;
  task.done = !task.done;
  return task;
}

export function deleteTask(id: string): boolean {
  const before = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  return tasks.length < before;
}
