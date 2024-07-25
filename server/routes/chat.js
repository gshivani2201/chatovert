import express from "express";

import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  sendAttachments,
} from "../controllers/chat.js";
import { attachments } from "../middlewares/multer.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/new", newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);

app.put("/addmembers", addMembers);
app.put("/removemember", removeMember);

app.delete("/leave/:id", leaveGroup)

app.post("/message", attachments, sendAttachments  )

export default app;
