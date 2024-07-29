import express from "express";

// 3rd party packages
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";

// middlewares
import { errorMiddleware } from "./middlewares/errors.js";

import { connectDB } from "./utils/features.js";

// routes
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import adminRoutes from "./routes/admin.js";

dotenv.config({
  path: "./.env",
});

const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "demonslayer";

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

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(errorMiddleware);

server.listen(port, () => {
  console.log(`Sever is running on port ${port} in ${envMode} mode`);
});

export { envMode, adminSecretKey };
