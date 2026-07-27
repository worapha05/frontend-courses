import { ordersFeature } from './orders.reducer';
import { loadOrdersEffect } from './orders.effects';
import { OrdersApi } from './orders.api';

/**
 * Wiring สรุป:
 * Angular → provideState(ordersFeature) + provideEffects(...)
 * ที่นี่เก็บ blueprint สำหรับศึกษาโครงสร้าง
 */
export const ordersStoreBlueprint = {
  feature: ordersFeature,
  api: OrdersApi,
  loadOrdersEffect,
};
