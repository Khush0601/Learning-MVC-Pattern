const bcrypt=require("bcryptjs")
const salt=10;
exports.generateHash=async(plainPassword)=>{
  const hash=await bcrypt.hash(plainPassword,salt)
  return hash
}

exports.verifyHash=async(plainPassword,passwordHash)=>{
   const result=await bcrypt.compare(plainPassword,passwordHash)
   return true
}