import type { PageServerLoad } from './$types';
import { listProducts } from '$lib/server/products';

export const load: PageServerLoad = async () => {
  return {
    products: listProducts(),
  };
};
