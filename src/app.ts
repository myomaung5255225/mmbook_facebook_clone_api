import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()
const db = process.env.DB || '';
const port = process.env.PORT || 4000;
const app =express()
mongoose.connect(db,{useFindAndModify:true,useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running at port ${port}.`)
    })
})
.catch(err=>{
    console.log(err)
})

