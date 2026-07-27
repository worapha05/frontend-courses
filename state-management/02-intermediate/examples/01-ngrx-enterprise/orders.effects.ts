import { ofType } from '@ngrx/effects';
import type { Action } from '@ngrx/store';
import { catchError, map, of, switchMap, type Observable } from 'rxjs';
import { OrdersActions } from './orders.actions';
import type { OrdersApi } from './orders.api';

/**
 * Effect stream แบบเรียน RxJS ให้ชัด
 * ใน Angular: หุ้มด้วย createEffect(() => this.actions$.pipe(...)) หรือ functional createEffect
 */
export function loadOrdersEffect(actions$: Observable<Action>, api: OrdersApi): Observable<Action> {
  return actions$.pipe(
    ofType(OrdersActions.loadOrders, OrdersActions.refresh),
    switchMap((action) => {
      const status = 'status' in action ? action.status : 'all';
      return api.getOrders(status).pipe(
        map((orders) => OrdersActions.loadOrdersSuccess({ orders })),
        catchError((err: unknown) =>
          of(
            OrdersActions.loadOrdersFailure({
              error: err instanceof Error ? err.message : 'Unknown error',
            }),
          ),
        ),
      );
    }),
  );
}

/** ตัวอย่างเลือก operator ตาม UX */
export const operatorGuide = {
  searchAsYouType: 'switchMap',
  checkoutSubmit: 'exhaustMap',
  sequentialWrites: 'concatMap',
  fanOutIndependent: 'mergeMap',
} as const;
