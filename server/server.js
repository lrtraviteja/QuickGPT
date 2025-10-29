import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv/config'
import connectDB from './configs/db.js'
import userRouter from './routes/UserRoutes.js'

const app = express()

await connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('Server is Live!'))
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})