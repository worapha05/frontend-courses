import { createActionGroup, props } from '@ngrx/store';

export type Category = 'all' | 'books' | 'gadgets';

export const FiltersActions = createActionGroup({
  source: 'FilterForge',
  events: {
    'Query Changed': props<{ q: string }>(),
    'Category Changed': props<{ category: Category }>(),
    'Debounced Query Updated': props<{ q: string }>(),
  },
});
