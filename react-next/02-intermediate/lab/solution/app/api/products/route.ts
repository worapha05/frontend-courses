import { NextResponse } from 'next/server';
import { listProducts } from '@/data/products';

export async function GET() {

  return NextResponse.json(listProducts());
}
