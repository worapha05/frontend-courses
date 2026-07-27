import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cartSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
  },
  // devTools เปิดอัตโนมัติใน development เมื่อใช้ bundler จริง
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
