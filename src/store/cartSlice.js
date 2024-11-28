import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const { id, title, price, stock, thumbnail, discountPercentage, quantity = 1 } = action.payload;

      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        existingItem.quantity = Math.min(newQuantity, stock); // Limit to stock
        existingItem.totalPrice =
          (price - (price * (discountPercentage / 100))) * existingItem.quantity; // Update total price
      } else {
        state.items.push({
          id,
          title,
          price,
          stock,
          thumbnail,
          discountPercentage,
          quantity: Math.min(quantity, stock), // Limit to stock
          totalPrice: (price - (price * (discountPercentage / 100))) * Math.min(quantity, stock),
        });
      }
    },

    removeItem: (state, action) => {
      const { id } = action.payload;

      state.items = state.items.filter(item => item.id !== id);
    },

    decreaseQuantity: (state, action) => {
      const { id } = action.payload;

      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.totalPrice =
            (existingItem.price - (existingItem.price * (existingItem.discountPercentage / 100))) * existingItem.quantity; // Update total price
        } else {
          state.items = state.items.filter(item => item.id !== id);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
