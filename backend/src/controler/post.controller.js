const postModel = require("../modules/post.model")
const  likeModel = require("../modules/like.model")
const commentModel = require("../modules/comment.model")
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


async function unlikepostcontroller(req, res) {
    const userid = req.user.id
    const postId = req.params.postId

    const post =  await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "post not found"
        })
    }

    const isliked = await likeModel.findOneAndDelete({
        post: postId,
        user: userid
    })

    res.status(200).json({
        message: "post unliked succesfully",
        like: isliked
    })
}


async function commentpostcontroller(req, res) {

    const userid = req.user.id
    const postId = req.params.postId


     const post =  await postModel.findById(postId)

   if(!postId){
    return res.status(400).json({
        message: "post id is required"
    })
   }

      const comment = await commentModel.create({
        post: postId,
        text: req.body.text,
        user: userid
      })



        res.status(201).json({  
            message: "comment added succesfully",
            comment
        })

  
    }






module.exports = {
    postcontroller,
    getpostcontroller,
    getpostcontrollerdetails,
    likepostcontroller,
    unlikepostcontroller,
    commentpostcontroller
}







