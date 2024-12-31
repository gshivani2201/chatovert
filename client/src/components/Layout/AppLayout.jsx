import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Drawer, Grid, Skeleton } from "@mui/material";

// actions
import { useMyChatsQuery } from "../../redux/reducers/api";
import { setIsMobileMenu } from "../../redux/reducers/misc";
import {
  incrementNotificationCount,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";

// hooks
import { useErrors, useSocketEvents } from "../../hooks/hook";

// child components
import Header from "./Header";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import { getSocket } from "../../socket";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  REFETCH_CHATS,
} from "../../constants/events";
import { getOrSaveFromLocalStorage } from "../lib/features";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const { isMobileMenu } = useSelector((state) => state.misc);
    const { newMessagesAlert } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.auth);
    const chatId = params.chatId;

    const socket = getSocket();

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromLocalStorage({
        key: NEW_MESSAGE_ALERT,
        value: newMessagesAlert,
      });
    }, [newMessagesAlert]);

    // listen to socket events
    const newMsgAlertListener = useCallback(
      (data) => {
        if (data.chat === chatId) return;

        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotificationCount());
    }, [dispatch]);

    const refetchChatsListener = useCallback(() => {
      refetch();
    }, [refetch]);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMsgAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchChatsListener,
    };

    useSocketEvents(socket, eventHandlers);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chat", _id, groupChat);
    };

    const handleMobileClose = () => {
      dispatch(setIsMobileMenu(false));
    };

    return (
      <>
        <Title />
        <Header />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenu} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
            />
          </Drawer>
        )}

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0, 0, 0, 0.85)",
            }}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

AppLayout.displayName = "AppLayout";

export default AppLayout;
