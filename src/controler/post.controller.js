const postModel = require("../modules/post.model")
require('dotenv').config();
const jwt = require("jsonwebtoken")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")



const imagekit = new ImageKit({
    privateKey: process.env.IMAGE_PRIVATE_KEY,

})


async function postcontroller(req, res) {

    console.log(req.body, req.file)

    const token = req.cookies?.token

    console.log(token)

    if (!token) {
        return res.status(401).json({
            message: "user not have token"
        })
    }


    let decode = null

    try{
        decode = jwt.verify(token, process.env.JWT_SECRET)
    }  catch(err){

        return res.status(401).json({
            message:"user not authirized"
        })

     }




    console.log(decode)

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test"
    })
  

    const post = await postModel.create({
        caption: req.body.caption,
        imgurl: file.url,
        user: decode.id
    })


    res.status(201).json({
    message : "post succesfully created"
    })

}






module.exports = {
    postcontroller
}







