const UserModel=require('../model/UserModel')

exports.createUser=async(req,res)=>{
  try{
   const userData=req.body;
   if(!userData.name || !userData.age){
    return res.json('required data is missing')
   }
   await UserModel.create(userData)
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