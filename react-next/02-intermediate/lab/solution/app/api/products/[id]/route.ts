import { NextResponse } from 'next/server';
import { getProduct } from '@/data/products';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Ctx) {
  const { id } = await context.params;
  const product = getProduct(id);
  if (!product) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}
