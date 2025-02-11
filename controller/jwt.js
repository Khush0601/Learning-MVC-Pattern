const jwt=require("jsonwebtoken")
require('dotenv').config()

exports.generateToken=async(data)=>{
    try{
        return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "10000s" });
    }
    catch(err){
        throw new Error("Token generation failed");
    }
}