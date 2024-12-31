import { createSlice } from "@reduxjs/toolkit";

import { getOrSaveFromLocalStorage } from "../../components/lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/events";

const INITIAL_STATE = {
  notifcationCount: 0,
  newMessageAlert: getOrSaveFromLocalStorage({
    key: NEW_MESSAGE_ALERT,
    get: true,
  }) || [
    {
      chatId: "",
      count: 0,
    },
  ],
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

    setNewMessagesAlert: (state, action) => {
      const chatId = action.payload.chatId;
      const index = state.newMessageAlert.findIndex(
        (alertItem) => alertItem.chatId === chatId
      );

      if (index > -1) {
        state.newMessageAlert[index].count += 1;
      } else {
        state.newMessageAlert.push({
          chatId: chatId,
          count: 1,
        });
      }
    },

    removeNewMessagesAlert: (state, action) => {
      state.newMessageAlert = state.newMessageAlert.filter(
        (alertItem) => alertItem.chatId !== action.payload
      );
    },
  },
});

export default chatSlice;
export const {
  incrementNotificationCount,
  resetNotificationCount,
  setNewMessagesAlert,
  removeNewMessagesAlert,
} = chatSlice.actions;
