import { z } from 'zod';

export const createOrderSchema = z.object({
  customer: z.string().trim().min(2).max(60),
  total: z.coerce.number().positive().max(1_000_000),
});

export const updateStatusSchema = z.object({
  status: z.enum(['pending', 'paid', 'shipped', 'cancelled']),
});
