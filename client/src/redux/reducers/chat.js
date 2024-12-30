import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  notifcationCount: 0,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: INITIAL_STATE,
  reducers: {
    incrementNotificationCount: (state, action) => {
      state.notifcationCount += 1;
    },

    resetNotificationCount: (state, action) => {
      state.uploadingLoader = 0;
    },
  },
});

export default chatSlice;
export const { incrementNotificationCount, resetNotificationCount } =
  chatSlice.actions;
