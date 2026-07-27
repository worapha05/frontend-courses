import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProduct } from '$lib/server/products';

export const load: PageServerLoad = async ({ params }) => {
  const product = getProduct(params.id);
  if (!product) {
    error(404, `ไม่พบสินค้า id=${params.id}`);
  }
  return { product };
};
