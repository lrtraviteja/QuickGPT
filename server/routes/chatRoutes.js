import express from "express";
import { protectedRoute } from "../middlewares/auth.js";
import { createChat, deleteChat, getChats } from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.get("/create", protectedRoute, createChat);
chatRouter.get("/all", protectedRoute, getChats);
chatRouter.post("/delete", protectedRoute, deleteChat);

export default chatRouter;
