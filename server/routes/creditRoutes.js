import express from "express"
import { getPlans, purchasePlan } from "../controllers/creditController.js"
import { protectedRoute } from "../middlewares/auth.js"

const creditRouter = express.Router() 

creditRouter.get('/plan', getPlans)
creditRouter.post('/purchase', protectedRoute, purchasePlan)

export default creditRouter