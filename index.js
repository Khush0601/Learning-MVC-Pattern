const express=require('express');
const route  = require('./router/routes');
const app=express()
const mongoose=require('mongoose')
const Port=3000;
const dotenv=require('dotenv')
dotenv.config()

//inbuilt-middleware 
app.use(express.json())
app.use("/v1",route)

//connection to db
mongoose.connect(process.env.MONOGODB_URL)
 const db=mongoose.connection
 db.on('error',()=>{
    console.log('error while connecting to db')
 })
 db.once('open',()=>{
    console.log('connected to database')
 })

//connection to server
app.listen(Port,()=>{
    console.log(`server started on ${Port}`)
})