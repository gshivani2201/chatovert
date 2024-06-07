import express from "express";

// controllers
import { login } from "../controllers/user.js";

const app = express.Router();

app.get("/login", login);

export default app;
