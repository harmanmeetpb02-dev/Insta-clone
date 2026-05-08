const express = require("express")
const cookiesParser = require("cookie-parser")
const cors = require("cors")
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.routes")
const app = express()

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}))
app.use(express.json())
app.use(cookiesParser())


app.use('/api/auth' , authRouter)


app.use('/api/post', postRouter)

app.use('/user', userRouter)



module.exports = app