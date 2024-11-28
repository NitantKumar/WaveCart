import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [], 
  },
  reducers: {
    addOrder: (state, action) => {
      const { totalAmount, productTitles } = action.payload;
      state.orders.push({
        id: state.orders.length + 1,
        totalAmount,
        productTitles,
        timestamp: new Date().toISOString(),
      });
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
