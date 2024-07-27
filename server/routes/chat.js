import express from "express";

import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachments,
} from "../controllers/chat.js";
import { attachments } from "../middlewares/multer.js";
import {
  addMemberValidator,
  chatIdValidator,
  newGroupValidator,
  removeMemberValidator,
  renameChatValidator,
  sendAttachmentsValidator,
  validationHandler,
} from "../lib/validators.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/new", newGroupValidator(), validationHandler, newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);

app.put("/addmembers", addMemberValidator(), validationHandler, addMembers);
app.put(
  "/removemember",
  removeMemberValidator(),
  validationHandler,
  removeMember
);

app.delete("/leave/:id", chatIdValidator(), validationHandler, leaveGroup);

app.post(
  "/message",
  attachments,
  sendAttachmentsValidator(),
  validationHandler,
  sendAttachments
);

app.get("/message/:id", chatIdValidator(), validationHandler, getMessages);

app
  .route("/:id")
  .get(chatIdValidator(), validationHandler, getChatDetails)
  .put(renameChatValidator(), validationHandler, renameGroup)
  .delete(chatIdValidator(), validationHandler, deleteChat);

export default app;
