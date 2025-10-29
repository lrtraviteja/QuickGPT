import express from "express"
import { getUserData, loginUser, registerUser } from "../controllers/userController"
import { protectedRoute } from "../middlewares/auth"

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/data', protectedRoute, getUserData)

export default  userRouter