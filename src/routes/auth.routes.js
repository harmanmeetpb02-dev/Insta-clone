const express = require("express")
const authcontroller = require("../controler/auth.controller")

const authRouter = express.Router()
const multer = require('multer')



authRouter.post('/register', authcontroller.registercontroller)




authRouter.post('/login', authcontroller.logincontroller )





module.exports = authRouter