import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Client-only grid UI state
 * ไม่เก็บ row payload จาก API ที่นี่
 */
export type GridUiState = {
  selectedIds: string[];
  density: 'compact' | 'comfortable';
  hiddenColumns: string[];
};

const initialState: GridUiState = {
  selectedIds: [],
  density: 'comfortable',
  hiddenColumns: [],
};

export const gridUiSlice = createSlice({
  name: 'gridUi',
  initialState,
  reducers: {
    toggleRow(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((x) => x !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
    setDensity(state, action: PayloadAction<GridUiState['density']>) {
      state.density = action.payload;
    },
    toggleColumn(state, action: PayloadAction<string>) {
      const col = action.payload;
      if (state.hiddenColumns.includes(col)) {
        state.hiddenColumns = state.hiddenColumns.filter((c) => c !== col);
      } else {
        state.hiddenColumns.push(col);
      }
    },
    clearSelection(state) {
      state.selectedIds = [];
    },
  },
});

export const { toggleRow, setDensity, toggleColumn, clearSelection } = gridUiSlice.actions;
export default gridUiSlice.reducer;

export const selectSelectedIds = (s: { gridUi: GridUiState }) => s.gridUi.selectedIds;
export const selectDensity = (s: { gridUi: GridUiState }) => s.gridUi.density;
export const selectHiddenColumns = (s: { gridUi: GridUiState }) => s.gridUi.hiddenColumns;

/**
 * ถ้าต้อง edit หลายแถว offline จริง ๆ ค่อยใช้ entity adapter สำหรับ draft
 * — แยกจาก server cache ชัดเจนว่าเป็น "draft overlay"
 */
export type DraftRow = { id: string; note: string };

const draftsAdapter = createEntityAdapter<DraftRow>();

export const draftsSlice = createSlice({
  name: 'drafts',
  initialState: draftsAdapter.getInitialState(),
  reducers: {
    upsertDraft: draftsAdapter.upsertOne,
    removeDraft: draftsAdapter.removeOne,
    clearDrafts: draftsAdapter.removeAll,
  },
});

export const draftsSelectors = draftsAdapter.getSelectors(
  (s: { drafts: ReturnType<typeof draftsSlice.reducer> }) => s.drafts,
);
