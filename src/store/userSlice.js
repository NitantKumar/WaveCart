import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    uid: null,
    email: null,
    displayName: null,
    isLoggedIn: false,
  },
  reducers: {
    addUser: (state, action) => {
      const { uid, email, displayName } = action.payload;
      state.uid = uid;
      state.email = email;
      state.displayName = displayName;
      state.isLoggedIn = true;
    },
    removeUser: (state) => {
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.isLoggedIn = false;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
