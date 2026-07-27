import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type OrderStatusFilter = 'all' | 'paid' | 'pending';

export type UiState = {
  sidebarOpen: boolean;
  statusFilter: OrderStatusFilter;
  selectedOrderId: string | null;
};

const initialState: UiState = {
  sidebarOpen: true,
  statusFilter: 'all',
  selectedOrderId: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setStatusFilter(state, action: PayloadAction<OrderStatusFilter>) {
      state.statusFilter = action.payload;
      // เมื่อเปลี่ยน filter มักเคลียร์ selection เก่า
      state.selectedOrderId = null;
    },
    selectOrder(state, action: PayloadAction<string>) {
      state.selectedOrderId = action.payload;
    },
    clearSelection(state) {
      state.selectedOrderId = null;
    },
  },
});

export const { toggleSidebar, setStatusFilter, selectOrder, clearSelection } = uiSlice.actions;
export default uiSlice.reducer;

export const selectSidebarOpen = (state: { ui: UiState }) => state.ui.sidebarOpen;
export const selectStatusFilter = (state: { ui: UiState }) => state.ui.statusFilter;
export const selectSelectedOrderId = (state: { ui: UiState }) => state.ui.selectedOrderId;
