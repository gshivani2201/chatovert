import express from "express";

// 3rd party packages
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";

// middlewares
import { errorMiddleware } from "./middlewares/errors.js";

import { connectDB } from "./utils/features.js";

// routes
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import adminRoutes from "./routes/admin.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";

dotenv.config({
  path: "./.env",
});

const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "demonslayer";

const userSocketIDs = new Map();

connectDB(MONGO_URI);

const app = express();
const server = createServer(app);
const io = new Server(server, {});

// Using middlewares

app.use(express.json()); // access json data
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/admin", adminRoutes);

// default home route
app.get("/", (req, res) => {
  res.send("Hello home");
});

io.use((socket, next) => {});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  const user = {
    _id: "abkjbc",
    name: "nklnck",
  };

  userSocketIDs.set(user._id.toString(), socket.id);

  console.log(userSocketIDs);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

    try {
      await Message.create(messageForDB);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    userSocketIDs.delete(user._id.toString());
    console.log("user disconnected");
  });
});

app.use(errorMiddleware);

server.listen(port, () => {
  console.log(`Sever is running on port ${port} in ${envMode} mode`);
});

export { envMode, adminSecretKey, userSocketIDs };
