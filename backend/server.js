import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
    
const app = express()
const port = 4000

// Middleware
app.use(express.json())
app.use(cors())

// ✅ Serve static images from 'uploads' folder
app.use("/uploads", express.static("uploads"))

// DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter)
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})
