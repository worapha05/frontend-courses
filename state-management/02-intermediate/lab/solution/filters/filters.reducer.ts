import { createFeature, createReducer, on } from '@ngrx/store';
import { FiltersActions, type Category } from './filters.actions';

export type FiltersState = {
  q: string;
  debouncedQ: string;
  category: Category;
};

const initialState: FiltersState = {
  q: '',
  debouncedQ: '',
  category: 'all',
};

const reducer = createReducer(
  initialState,
  on(FiltersActions.queryChanged, (state, { q }) => ({ ...state, q })),
  on(FiltersActions.debouncedQueryUpdated, (state, { q }) => ({
    ...state,
    debouncedQ: q,
  })),
  on(FiltersActions.categoryChanged, (state, { category }) => ({
    ...state,
    category,
  })),
);

export const filtersFeature = createFeature({
  name: 'filters',
  reducer,
});

export const { selectQ, selectDebouncedQ, selectCategory, selectFiltersState } = filtersFeature;
