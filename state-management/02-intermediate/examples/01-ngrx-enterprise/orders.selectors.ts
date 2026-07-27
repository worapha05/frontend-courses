import { createSelector } from '@ngrx/store';
import { selectItems, selectSelectedOrderId, selectStatusFilter } from './orders.reducer';

/** Selector แบบ compose — memoized โดย NgRx */
export const selectFilteredCount = createSelector(selectItems, (items) => items.length);

export const selectSelectedOrder = createSelector(
  selectItems,
  selectSelectedOrderId,
  (items, id) => items.find((o) => o.id === id) ?? null,
);

export const selectOrdersSummary = createSelector(
  selectItems,
  selectStatusFilter,
  (items, statusFilter) => ({
    statusFilter,
    totalAmount: items.reduce((sum, o) => sum + o.total, 0),
    paidCount: items.filter((o) => o.status === 'paid').length,
  }),
);
