const express=require('express')
const { createUser, listUser, updateUser, deleteUser, userLogin } = require('../controller/UserController')
const { adminMiddleware } = require('../controller/middleware')
const router=express.Router()

router.get('/',(req,res)=>{
    res.send('hello')
})

router.post('/add-User',createUser)
router.post('/login',userLogin)
router.get('/list-users',adminMiddleware,listUser)
router.put('/update-user/:id',updateUser)
router.delete('/delete-user/:id',deleteUser)

module.exports=router