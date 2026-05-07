const postModel = require("../modules/post.model")
const  likeModel = require("../modules/like.model")
require('dotenv').config();
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs");
const LikeModel = require("../modules/like.model");



const imagekit = new ImageKit({
    privateKey: process.env.IMAGE_PRIVATE_KEY,

})


async function postcontroller(req, res) {

    console.log(req.body, req.file)

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test"
    })
  

    const post = await postModel.create({
        caption: req.body.caption,
        imgurl: file.url,
        user: req.user.id
    })


    res.status(201).json({
    message : "post succesfully created"
    })

}


async function getpostcontroller(req, res) {


     const userid =  req.user.id

     const posts = await postModel.find({
        user: userid
     })

        res.status(200).json({ 
            message: "post fetched succesfully",    
            posts
         })

}




async function getpostcontrollerdetails(req, res) {



     const userid = req.user.id
     const postId = req.params.postId



      const post = await postModel.find({ postId})


      if(!post){
        return res.status(404).json({
            message: "post not found"
        })
      }


      const invalididuser = post.user === userid


      if(!invalididuser){
        return res.status(403).json({
            message: "user not authorized to access this post"
        })
      }

}


async function likepostcontroller(req, res) {

    const userid = req.user.id
    const postId = req.params.postId

    const post =  await postModel.findById(postId)



    if(!post){
        return res.status(404).json({
            message: "post not found"
        })
    }

  
    const isliked = await likeModel.create({
        post: postId,
        user: userid
    })

    res.status(201).json({
        message: "post liked succesfully",
        like: isliked
    })



}


module.exports = {
    postcontroller,
    getpostcontroller,
    getpostcontrollerdetails,
    likepostcontroller
}







