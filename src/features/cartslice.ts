import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

type CartItem = Product & {
  quantity: number;
};

type CartState = {
  cart: CartItem[];
};

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart(
      state,
      action: PayloadAction<Product>
    ) {
      const existingProduct =
        state.cart.find(
          (item) =>
            item.id === action.payload.id
        );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    removeFromCart(
      state,
      action: PayloadAction<number>
    ) {
      state.cart = state.cart.filter(
        (item) =>
          item.id !== action.payload
      );
    },

    increaseQuantity(
      state,
      action: PayloadAction<number>
    ) {
      const item = state.cart.find(
        (item) =>
          item.id === action.payload
      );

      if (item) {
        item.quantity++;
      }
    },

    decreaseQuantity(
      state,
      action: PayloadAction<number>
    ) {
      const item = state.cart.find(
        (item) =>
          item.id === action.payload
      );

      if (item) {
        item.quantity--;
      }

      state.cart = state.cart.filter(
        (item) => item.quantity > 0
      );
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;