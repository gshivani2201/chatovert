import express from "express";

// 3rd party packages
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// middlewares
import { errorMiddleware } from "./middlewares/errors.js";

import { connectDB } from "./utils/features.js";

// routes
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";

dotenv.config({
  path: "./.env",
});

const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
connectDB(MONGO_URI);

const app = express();

// Using middlewares

app.use(express.json()); // access json data
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

// default home route
app.get("/", (req, res) => {
  res.send("Hello home");
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Sever is running on port ${port}`);
});
