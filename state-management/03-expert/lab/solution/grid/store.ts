import { configureStore } from '@reduxjs/toolkit';
import { draftsSlice, gridUiSlice } from './gridUiSlice';

export const pulseStore = configureStore({
  reducer: {
    gridUi: gridUiSlice.reducer,
    drafts: draftsSlice.reducer,
  },
});

export type PulseRootState = ReturnType<typeof pulseStore.getState>;
export type PulseDispatch = typeof pulseStore.dispatch;

export function selectIsSelected(state: PulseRootState, id: string) {
  return state.gridUi.selectedIds.includes(id);
}
