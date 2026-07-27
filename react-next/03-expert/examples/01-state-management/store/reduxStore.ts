import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';

type UiState = {
  sidebarOpen: boolean;
  dense: boolean;
};

const initialState: UiState = {
  sidebarOpen: true,
  dense: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setDense(state, action: PayloadAction<boolean>) {
      state.dense = action.payload;
    },
  },
});

export const { toggleSidebar, setDense } = uiSlice.actions;

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
