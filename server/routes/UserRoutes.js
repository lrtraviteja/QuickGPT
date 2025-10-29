import express from "express"
import { getUserData, loginUser, registerUser } from "../controllers/userController.js"
import { protectedRoute } from "../middlewares/auth.js"

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/data', protectedRoute, getUserData)

export default  userRouter