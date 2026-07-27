import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  productId: string;
  name: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  couponCode: string | null;
};

const initialState: CartState = {
  items: [],
  couponCode: null,
};

/**
 * Slice = state + reducers + action creators ในที่เดียว
 * ใช้สำหรับ Client State (guest cart ใน memory) — ยังไม่ใช่ server cart
 */
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) {
      const qty = action.payload.quantity ?? 1;
      const existing = state.items.find((i) => i.productId === action.payload.productId);
      if (existing) {
        existing.quantity += qty;
      } else {
        state.items.push({
          productId: action.payload.productId,
          name: action.payload.name,
          quantity: qty,
        });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
    setQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const item = state.items.find((i) => i.productId === action.payload.productId);
      if (!item) return;
      if (action.payload.quantity <= 0) {
        state.items = state.items.filter((i) => i.productId !== action.payload.productId);
      } else {
        item.quantity = action.payload.quantity;
      }
    },
    applyCoupon(state, action: PayloadAction<string | null>) {
      state.couponCode = action.payload;
    },
    clearCart(state) {
      state.items = [];
      state.couponCode = null;
    },
  },
});

export const { addItem, removeItem, setQuantity, applyCoupon, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

/** Selectors — อ่านเฉพาะส่วนที่ต้องการ */
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCoupon = (state: { cart: CartState }) => state.cart.couponCode;
