import { NextResponse } from 'next/server';
import { orderRepo } from '@/lib/orderRepo';
import { updateStatusSchema } from '@/lib/validation';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Ctx) {
  const { id } = await context.params;
  const json: unknown = await request.json();
  const parsed = updateStatusSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }
  const updated = orderRepo.updateStatus(id, parsed.data.status);
  if (!updated) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }
  return NextResponse.json(updated);
}
