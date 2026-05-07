const mongoose = require ("mongoose")

const likeSchema = new mongoose.Schema({  
   
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required: [true, 'post is required']
        
    },


    user:{
       type: String,
       ref: 'user',
       required: [true, 'user is required']


        
    }

})   


const LikeModel = mongoose.model('like', likeSchema)

module.exports = LikeModel