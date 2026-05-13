const express = require("express")
const authcontroller = require("../controler/auth.controller")
const authmiddleware = require("../middleware/auth.middleware")

const authRouter = express.Router()
const multer = require('multer')
const authMiddleware = require("../middleware/auth.middleware")



authRouter.post('/register', authcontroller.registercontroller)




authRouter.post('/login', authcontroller.logincontroller )


authRouter.get('/me', authMiddleware, authcontroller.getMeController)




module.exports = authRouter