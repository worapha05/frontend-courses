import { NextResponse } from 'next/server';
import { getProductsPayload } from '@/lib/products';

export async function GET() {

  return NextResponse.json(getProductsPayload());
}
