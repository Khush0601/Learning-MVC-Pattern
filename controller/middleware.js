const UserModel = require("../model/UserModel");
const { decodeToken } = require("./jwt");

exports.adminMiddleware=async(req,res,next)=>{
    const token=req.headers.authorization;
    console.log('token',token)
    if(!token){
        return res.json({message:'user not authenticated'})
    }
    const tokenInfo=decodeToken(token)
    if(!tokenInfo){
        return res.json('invalid token')
    }
    const user=await UserModel.findOne({email:tokenInfo.email})
    if(!user){
        return res.json({message:"User with email doesn't exists"})
    }
    if(user.role==='admin'){
        return res.json('access restricted to users')
    }
    next()
}

