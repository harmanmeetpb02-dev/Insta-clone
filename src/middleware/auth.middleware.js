const jwt = require("jsonwebtoken")

async  function authMiddleware(req, res, next) {
const token = req.cookies?.token


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

   req.user = decode

    next()




}


module.exports = authMiddleware