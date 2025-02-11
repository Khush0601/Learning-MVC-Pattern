const jwt=require("jsonwebtoken")
require('dotenv').config()

exports.generateToken=async(data)=>{
    try{
        
        return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
    catch(err){
        throw new Error("Token generation failed");
        
    }
}

exports.decodeToken=(token)=>{
    const result=jwt.verify(token,process.env.JWT_SECRET)
    return result;
}