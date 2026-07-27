import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type GridUiState = {
  selectedIds: string[];
  hiddenColumns: string[];
};

const initialState: GridUiState = {
  selectedIds: [],
  hiddenColumns: [],
};

export const gridUiSlice = createSlice({
  name: 'gridUi',
  initialState,
  reducers: {
    toggleSelected(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.selectedIds = state.selectedIds.includes(id)
        ? state.selectedIds.filter((x) => x !== id)
        : [...state.selectedIds, id];
    },
    toggleHiddenColumn(state, action: PayloadAction<string>) {
      const col = action.payload;
      state.hiddenColumns = state.hiddenColumns.includes(col)
        ? state.hiddenColumns.filter((c) => c !== col)
        : [...state.hiddenColumns, col];
    },
  },
});

export const { toggleSelected, toggleHiddenColumn } = gridUiSlice.actions;

export type DraftNote = { id: string; note: string };
const draftsAdapter = createEntityAdapter<DraftNote>();

export const draftsSlice = createSlice({
  name: 'drafts',
  initialState: draftsAdapter.getInitialState(),
  reducers: {
    upsertDraft: draftsAdapter.upsertOne,
    removeDraft: draftsAdapter.removeOne,
  },
});

export const draftsSelectors = draftsAdapter.getSelectors(
  (s: { drafts: ReturnType<typeof draftsSlice.reducer> }) => s.drafts,
);
