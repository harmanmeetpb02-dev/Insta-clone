const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserModel = require("../modules/user.model")
require('dotenv').config();


 async function registercontroller (req, res) {
   const { email, password, bio, username } = req.body

   const isuserExistbyemail = await UserModel.findOne({ email })


   $or: [
      { email },
      { username }

   ]


   if (isuserExistbyemail) {
      return res.status(409)
         .json({
            message: "user already exist" + (isuserExistbyemail == email ? "Email already exist" : "Username already Exist")

         })
   }

   const hash = await bcrypt.hash(password, 10)

   const user = await UserModel.create({

      email, password:hash, bio, username

   })


   const token = jwt.sign({
      id: user._id,
      username: user.username
   }, process.env.JWT_SECRET, )


   res.cookie("token", token,{
      httpOnly: true
   })

   res.status(201).json({

      message: 'user succesfully registered',

      user: {
         email: user.email,
         username: user.username,
         bio: user.bio

      }
   })

}


async function logincontroller(req,res) {
   const { email, password, username } = req.body
   
   const user = await UserModel.findOne({ 

      $or:[
         {username:username},
         {email:email}
      ]
    })


    if(!user){
      return res.status(404).json({
         message: "user not found"
      })

    }


    const userpassword = await bcrypt.compare(password, user.password);



if(!userpassword){
   return res.status(401).json({
      message:"passwod is invalid"
   })
}


  const token = jwt.sign({
      id: user._id,
      username: user.username
   }, process.env.JWT_SECRET, )



   res.cookie("token", token)


   res.status(201).json({

      message: 'user succesfully login',

      user: {
         email: user.email,
         username: user.username,
         bio: user.bio

      }
   })


}



module.exports = {
    registercontroller,
    logincontroller
}