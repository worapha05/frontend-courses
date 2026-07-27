import { generateOrders } from '../../utils/orders';

export default defineEventHandler(() => {
  return { items: generateOrders(2500) };
});
