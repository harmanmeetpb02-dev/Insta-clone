const express = require("express")
const postcontroller = require("../controler/post.controller")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})

const postRouter = express.Router()





postRouter.post('/', upload.single("img"), postcontroller.postcontroller)






module.exports = postRouter




