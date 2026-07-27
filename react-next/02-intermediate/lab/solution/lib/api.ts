import type { Product } from '@/data/products';
import { getProduct, listProducts } from '@/data/products';

/**
 * หน้า RSC ควรเรียก data layer โดยตรง
 * เก็บ HTTP fetch ไว้สำหรับ client / บริการภายนอกเท่านั้น
 */
export async function fetchProducts(): Promise<Product[]> {
  await new Promise((r) => setTimeout(r, 40));
  return listProducts();
}

export async function fetchProduct(id: string): Promise<Product | null> {
  await new Promise((r) => setTimeout(r, 40));
  return getProduct(id) ?? null;
}
