const express = require("express")
const usercontroller = require("../controler/user.controller")
const authMiddleware = require("../middleware/auth.middleware")





const userRouter = express.Router()

userRouter.post('/follow/:username', authMiddleware, usercontroller.followcontroller)


userRouter.post('/unfollow/:username', authMiddleware, usercontroller.unfollowcontroller)




module.exports = userRouter