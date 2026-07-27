'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { todoRepo } from './todoRepo';

const schema = z.object({
  title: z.string().trim().min(3, 'อย่างน้อย 3 ตัวอักษร').max(100),
});

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function createTodoAction(formData: FormData): Promise<ActionResult> {
  const parsed = schema.safeParse({ title: formData.get('title') });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'invalid' };
  }

  todoRepo.create(parsed.data.title);
  revalidatePath('/dashboard');
  return { ok: true };
}

export async function toggleTodoAction(id: string): Promise<ActionResult> {
  const updated = todoRepo.toggle(id);
  if (!updated) return { ok: false, error: 'not found' };
  revalidatePath('/dashboard');
  return { ok: true };
}
