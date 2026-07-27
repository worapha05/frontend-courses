import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { parseStoredTasks, type TaskFormValues } from '../lib/validation';
import type { Filter, Task } from '../types/task';

type TaskContextValue = {
  tasks: Task[];
  filter: Filter;
  setFilter: (f: Filter) => void;
  addTask: (values: TaskFormValues) => void;
  toggleTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextValue | null>(null);
const STORAGE_KEY = 'rn-bootcamp-tasks';

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() =>
    parseStoredTasks(localStorage.getItem(STORAGE_KEY)),
  );
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((values: TaskFormValues) => {
    const task: Task = {
      id: crypto.randomUUID(),
      title: values.title.trim(),
      priority: values.priority,
      done: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [task, ...prev]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }, []);

  const value = useMemo(
    () => ({ tasks, filter, setFilter, addTask, toggleTask }),
    [tasks, filter, addTask, toggleTask],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
}
