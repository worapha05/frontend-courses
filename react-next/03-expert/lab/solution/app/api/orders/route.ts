import { NextResponse } from 'next/server';
import { orderRepo } from '@/lib/orderRepo';
import { createOrderSchema } from '@/lib/validation';

export async function GET() {
  return NextResponse.json(orderRepo.list());
}

export async function POST(request: Request) {
  const json: unknown = await request.json();
  const parsed = createOrderSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }
  const order = orderRepo.create(parsed.data);
  return NextResponse.json(order, { status: 201 });
}
