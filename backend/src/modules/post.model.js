const mongoose = require ("mongoose")



const postSchema = new mongoose.Schema({
    caption :{
         type: String,
         default : ""
    },
    imgurl:{
        type: String,
        required: [true, ' image url is required']
    },
    user:{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "user id required"]
    }
    
})


const PostModel = mongoose.model('post', postSchema)
module.exports = PostModel