const followerModel = require("../modules/follower.model");
const userModel = require("../modules/user.model");
require('dotenv').config();



async function followcontroller(req, res) {

    const followusername = req.user.username
    const followeeusername = req.params.username



    const isuserExist = await userModel.findOne({
        username: followeeusername

        
    })


 console.log(followusername, followeeusername,isuserExist)
 
    if(!isuserExist) {
        return res.status(404).json({
            message: "user you want to follow does not exist"
        })
    }

   

    if (followusername == followeeusername) {
        return res.status(400).json({
            message: "you cannot follow yourself"
        })
    }


     const isalreadyfollow = await followerModel.findOne({
        follower: followusername,
        followee: followeeusername
    })

    if (isalreadyfollow) {
        return res.status(400).json({
            message: `you already follow ${followeeusername}`,

            follow:isalreadyfollow
        })
    }


    const followrecord = await followerModel.create({
        follower: followusername,
        followee: followeeusername
    })


   

    res.status(201).json({
        message: `you have succesfully followed ${followusername}`,
        
        follow: followrecord

    })

}


async function unfollowcontroller(req, res) {

    const followusername = req.user.username
    const followeeusername = req.params.username    

    const isuserExist = await followerModel.findOne({
        follower: followusername,
        followee: followeeusername    
    })



    if(!isuserExist) {
        return res.status(404).json({
            message: "user you want to unfollow does not exist"
        })
    }

        await followerModel.findOneAndDelete(isuserExist._id)

        res.status(200).json({
            message: `you have succesfully unfollowed ${followeeusername}`
        })
}



module.exports = {
    followcontroller,
    unfollowcontroller
}