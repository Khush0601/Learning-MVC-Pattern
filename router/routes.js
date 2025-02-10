const express=require('express')
const { createUser, listUser, updateUser, deleteUser } = require('../controller/UserController')
const router=express.Router()

router.get('/',(req,res)=>{
    res.send('hello')
})

router.post('/add-User',createUser)
router.get('/list-users',listUser)
router.put('/update-user/:id',updateUser)
router.delete('/delete-user/:id',deleteUser)

module.exports=router