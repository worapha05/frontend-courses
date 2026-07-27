import { configureStore, createSelector } from '@reduxjs/toolkit';
import gridUiReducer, { draftsSlice, selectHiddenColumns, selectSelectedIds } from './gridUiSlice';

export const store = configureStore({
  reducer: {
    gridUi: gridUiReducer,
    drafts: draftsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

/** memoized: เปลี่ยนเฉพาะเมื่อ selection หรือ hidden columns เปลี่ยน */
export const selectGridChrome = createSelector(
  [selectSelectedIds, selectHiddenColumns],
  (selectedIds, hiddenColumns) => ({
    selectedCount: selectedIds.length,
    hiddenColumns,
  }),
);

export function selectIsRowSelected(state: RootState, rowId: string) {
  return state.gridUi.selectedIds.includes(rowId);
}
