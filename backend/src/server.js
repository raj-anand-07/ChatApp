import express from "express"
import "dotenv/config";
import path from "path"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js"

const app = express()

// middleware
app.use(express.json({ limit: "5mb" }))  // req.body
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

// make ready for deployment 
const __dirname = path.resolve()
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
  })
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server is ruuning on PORT: " + PORT)
  connectDB()
})