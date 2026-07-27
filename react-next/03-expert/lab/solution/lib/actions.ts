'use server';

import { revalidatePath } from 'next/cache';
import { orderRepo } from './orderRepo';
import { createOrderSchema, updateStatusSchema } from './validation';
import type { OrderStatus } from './types';

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function createOrderAction(formData: FormData): Promise<ActionResult> {
  const parsed = createOrderSchema.safeParse({
    customer: formData.get('customer'),
    total: formData.get('total'),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'invalid' };
  }
  orderRepo.create(parsed.data);
  revalidatePath('/dashboard');
  return { ok: true };
}

export async function updateOrderStatusAction(
  id: string,
  status: OrderStatus,
): Promise<ActionResult> {
  const parsed = updateStatusSchema.safeParse({ status });
  if (!parsed.success) return { ok: false, error: 'invalid status' };
  const updated = orderRepo.updateStatus(id, parsed.data.status);
  if (!updated) return { ok: false, error: 'not found' };
  revalidatePath('/dashboard');
  return { ok: true };
}
