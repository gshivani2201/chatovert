import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  useGetChatDetailsQuery,
  useGetMessagesQuery,
} from "../redux/reducers/api";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagesAlert } from "../redux/reducers/chat";

// third party packages
import { IconButton, Skeleton, Stack } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { useInfiniteScrollTop } from "6pp";

// assets
import { gray, orange } from "../constants/color";

// Child components
import AppLayout from "../components/Layout/AppLayout";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../constants/events";
import { useErrors, useSocketEvents } from "../hooks/hook";

const Chat = ({ chatId, user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [iAmTyping, setIAmTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);

  const containerRef = useRef(null);
  const typingTimeout = useRef(null);

  const dispatch = useDispatch();

  const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });
  const members = chatDetails?.data?.chat?.members;
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const socket = getSocket();

  useEffect(() => {
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessage("");
      setMessages([]);
      setPage(1);
      setOldMessages([]);
    };
  }, [chatId]);

  // socket events listeners
  const newMsgListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      console.log("typing...");
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      console.log("stop typing");
    },
    [chatId]
  );

  const eventHandlers = {
    [NEW_MESSAGE]: newMsgListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandlers);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);

    if (!iAmTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIAmTyping(true);
    }

    setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIAmTyping(false);
    }, 2000);
  };

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });

    setMessage("");
  };

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={gray}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>

      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.6rem",
              rotate: "30deg",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type message here..."
            value={message}
            onChange={messageChangeHandler}
          />

          <IconButton
            type="submit"
            sx={{
              bgcolor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </>
  );
};

export default AppLayout()(Chat);
