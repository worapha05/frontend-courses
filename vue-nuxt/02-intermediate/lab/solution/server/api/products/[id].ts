import { PRODUCTS } from '../../utils/products';

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'));
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' });
  }
  return product;
});
