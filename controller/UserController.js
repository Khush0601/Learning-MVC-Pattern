const UserModel=require('../model/UserModel');
const { generateHash, verifyHash } = require('./bcrypt');
const { generateToken } = require('./jwt');

exports.createUser=async(req,res)=>{
  try{
   const userData=req.body;
   if(!userData.name || !userData.age ||!userData.email ||!userData.password ||!userData.role){
    return res.json('required data is missing')
   }
   //checking if a user already exists or not
   const user=await UserModel.findOne({email:userData.email})
   if(user){
    return res.json({message:"user alreay exists"})
   }
   // if user not exists then create user before creating hash the password
   const passwordHash=await generateHash(userData.password)
   await UserModel.create({...userData,password:passwordHash})
   return  res.json('user created successfully')
  }
  catch(err){
    return res.json({message:err})
  }
}

exports.listUser=async(req,res)=>{
    try{
    const user=await UserModel.find({})
     return  res.json(user)
    }
    catch(err){
      return res.json({message:err})
    }
  }

  exports.updateUser=async(req,res)=>{
    try{
     const {id}=req.params;
     const userData=req.body;
     if(!userData.name || !userData.age ||!id){
      return res.json('required data is missing')
     }
     await UserModel.findByIdAndUpdate(id,userData,{ new: true })
     return  res.json({message:'user updated Successfully'})
    }
    catch(err){
      return res.json({message:err})
    }
  }

  exports.deleteUser=async(req,res)=>{
    try{
     const {id}=req.params;
     
     await UserModel.findByIdAndDelete(id)
     return  res.json({message:'user deleted Successfully'})
    }
    catch(err){
      return res.json({message:err})
    }
  }


  exports.userLogin=async(req,res)=>{
    try{
     const userData=req.body;
     if(!userData.email || !userData.password){
      return res.json({message:'required data is missing'})
     }
     //checking if a user already exists or not
     const user=await UserModel.findOne({email:userData.email})
     if(!user){
      return res.json({message:"user donot  exists"})
     }
     // if user exists then create verify the password
     const verifyPassword=await verifyHash(userData.password,user.password)
     if(!verifyPassword){
      return res.json({message:"wrong credentials"})
     }
     const token=generateToken({email:user.email,role:user.role})
     console.log(token);
     
     return  res.json({message:"login successfully",token})
    }
    catch(err){
      return res.json({message:err})
    }
  }