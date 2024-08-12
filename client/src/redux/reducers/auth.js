import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  user: null,
  isAdmin: false,
  loader: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
    },
  },
});

export default authSlice;
export const { userExists, userNotExists } = authSlice.actions;
