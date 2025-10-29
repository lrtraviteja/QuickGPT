import express from "express"
import { imageMessageController, textMessageController } from "../controllers/messageController.js"
import { protectedRoute } from "../middlewares/auth.js"

const messageRouter = express.Router()

messageRouter.post('/text', protectedRoute, textMessageController)
messageRouter.post('/image', protectedRoute, imageMessageController)

export default messageRouter