const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
      post: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'Post',
        required: true
    },

    text: {
        type: String,  
        required: true
    },
    user: { 
        type: String,
        ref: 'User',
        required: true
    }
})


const commentModel = mongoose.model('Comment', commentSchema)

module.exports = commentModel


