import { useCallback, useEffect, useRef, useState } from "react";

// third party packages
import { IconButton, Skeleton, Stack } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";

// assets
import { gray, orange } from "../constants/color";

// Child components
import AppLayout from "../components/Layout/AppLayout";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { NEW_MESSAGE } from "../constants/events";
import { useGetChatDetailsQuery } from "../redux/reducers/api";
import { useErrors, useSocketEvents } from "../hooks/hook";

const Chat = ({ chatId, user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const containerRef = useRef(null);

  const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });
  const members = chatDetails?.data?.chat?.members;
  const errors = [{ isError: chatDetails.isError, error: chatDetails.error }]

  const socket = getSocket();

  const newMsgFunc = useCallback((data) => {
    setMessages((prev) => [...prev, data.message]);
  }, []);

  const eventHandlers = { [NEW_MESSAGE]: newMsgFunc };

  useSocketEvents(socket, eventHandlers);

  useErrors(errors)

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
        {messages.map((i) => (
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
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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

      <FileMenu />
    </>
  );
};

export default AppLayout()(Chat);
