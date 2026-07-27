import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UiState = {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
};

const initialState: UiState = {
  sidebarOpen: true,
  theme: 'light',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme(state, action: PayloadAction<UiState['theme']>) {
      state.theme = action.payload;
    },
  },
});

export const { toggleSidebar, setTheme } = uiSlice.actions;
export default uiSlice.reducer;

export const selectSidebarOpen = (state: { ui: UiState }) => state.ui.sidebarOpen;
export const selectTheme = (state: { ui: UiState }) => state.ui.theme;
