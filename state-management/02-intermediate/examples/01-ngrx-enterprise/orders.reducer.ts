import { createFeature, createReducer, on } from '@ngrx/store';
import { OrdersActions, type Order } from './orders.actions';

export type OrdersState = {
  items: Order[];
  statusFilter: 'all' | 'paid' | 'pending';
  selectedOrderId: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: OrdersState = {
  items: [],
  statusFilter: 'all',
  selectedOrderId: null,
  loading: false,
  error: null,
};

const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.loadOrders, (state, { status }) => ({
    ...state,
    statusFilter: status,
    loading: true,
    error: null,
  })),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    items: orders,
    loading: false,
  })),
  on(OrdersActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(OrdersActions.selectOrder, (state, { orderId }) => ({
    ...state,
    selectedOrderId: orderId,
  })),
);

export const ordersFeature = createFeature({
  name: 'orders',
  reducer: ordersReducer,
});

export const {
  name: ordersFeatureKey,
  reducer: ordersFeatureReducer,
  selectOrdersState,
  selectItems,
  selectLoading,
  selectError,
  selectSelectedOrderId,
  selectStatusFilter,
} = ordersFeature;
