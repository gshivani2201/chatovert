import express from "express";

// controllers
import {
  acceptFriendRequest,
  getMyNotifications,
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
} from "../controllers/user.js";

// middlewares
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  acceptRequestValidator,
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validationHandler,
} from "../lib/validators.js";

const app = express.Router();

app.post("/new", singleAvatar, registerValidator(), validationHandler, newUser);
app.post("/login", loginValidator(), validationHandler, login);

app.use(isAuthenticated);

app.get("/me", getMyProfile);
app.get("/logout", logout);
app.get("/search", searchUser);

app.put(
  "/sendrequest",
  sendRequestValidator(),
  validationHandler,
  sendFriendRequest
);

app.put(
  "/accept-request",
  acceptRequestValidator(),
  validationHandler,
  acceptFriendRequest
);

app.get("/notifications", getMyNotifications);

export default app;
