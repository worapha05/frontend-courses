import { ofType } from '@ngrx/effects';
import type { Action } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, map, type Observable } from 'rxjs';
import { FiltersActions } from './filters.actions';

/**
 * keystroke → debounce 300ms → Debounced Query Updated
 * ฝั่ง React Query ควร subscribe แค่ debouncedQ ไม่ใช่ q ดิบ
 */
export function debounceQueryEffect(actions$: Observable<Action>): Observable<Action> {
  return actions$.pipe(
    ofType(FiltersActions.queryChanged),
    debounceTime(300),
    distinctUntilChanged((a, b) => a.q === b.q),
    map(({ q }) => FiltersActions.debouncedQueryUpdated({ q })),
  );
}
