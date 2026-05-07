const express = require("express")
const postcontroller = require("../controler/post.controller")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})
const authMiddleware = require("../middleware/auth.middleware")

const postRouter = express.Router()





postRouter.post('/', upload.single("img"), authMiddleware, postcontroller.postcontroller)



postRouter.get('/', authMiddleware, postcontroller.getpostcontroller) 



postRouter.get('/details/:postId', authMiddleware, postcontroller.getpostcontrollerdetails)


postRouter.post('/like/:postId', authMiddleware, postcontroller.likepostcontroller)


postRouter.post('/unlike/:postId', authMiddleware, postcontroller.unlikepostcontroller)

postRouter.post('/comment/:postId', authMiddleware, postcontroller.commentpostcontroller)


module.exports = postRouter




