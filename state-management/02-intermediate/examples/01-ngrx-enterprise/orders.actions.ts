import { createActionGroup, emptyProps, props } from '@ngrx/store';

export type Order = {
  id: string;
  customer: string;
  total: number;
  status: 'paid' | 'pending';
};

export const OrdersActions = createActionGroup({
  source: 'Orders',
  events: {
    'Load Orders': props<{ status: 'all' | 'paid' | 'pending' }>(),
    'Load Orders Success': props<{ orders: Order[] }>(),
    'Load Orders Failure': props<{ error: string }>(),
    'Select Order': props<{ orderId: string | null }>(),
    Refresh: emptyProps(),
  },
});
