import { z } from 'zod';
import type { Task } from '../types/task';

export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'ชื่อต้องมีอย่างน้อย 3 ตัวอักษร')
    .max(80, 'ชื่อยาวเกิน 80 ตัวอักษร'),
  priority: z.enum(['low', 'medium', 'high']),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;

const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  done: z.boolean(),
  createdAt: z.string(),
});

export function parseStoredTasks(raw: string | null): Task[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    const result = z.array(taskSchema).safeParse(parsed);
    return result.success ? result.data : [];
  } catch {
    return [];
  }
}
