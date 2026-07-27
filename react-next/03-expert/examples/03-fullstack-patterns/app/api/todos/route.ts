import { NextResponse } from 'next/server';
import { z } from 'zod';
import { todoRepo } from '@/lib/todoRepo';

export async function GET() {
  return NextResponse.json(todoRepo.list());
}

const bodySchema = z.object({
  title: z.string().trim().min(3).max(100),
});

export async function POST(request: Request) {
  const json: unknown = await request.json();
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }
  const todo = todoRepo.create(parsed.data.title);
  return NextResponse.json(todo, { status: 201 });
}
