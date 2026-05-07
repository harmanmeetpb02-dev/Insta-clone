const mongoose = require ("mongoose")

const followersSchema = new mongoose.Schema({

    follower:{
      type: String,
    },

    followee: {
      type: String,
    }
},    {
    timestamps: true
    })

module.exports = mongoose.model("follower", followersSchema)


