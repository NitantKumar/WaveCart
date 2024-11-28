import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [], // List of favorite items
  },
  reducers: {
    add: (state, action) => {
      const itemExists = state.items.find(item => item.id === action.payload.id);
      if (!itemExists) {
        state.items.push(action.payload);
      }
    },
    remove: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    clear: (state) => {
      state.items = [];
    },
  },
});

export const { add, remove, clear } = favoriteSlice.actions;
export default favoriteSlice.reducer;
