const express= require("express")
const jwt= require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token= req.headers.authorization
    if(token){
        jwt.verify(token,"masai",(err,decode)=>{
            if(decode){
                req.body.user=decode.userId
                console.log(decode)
                next()
            }
            else{
                res.send("Please login first")
            }
        })
    }
}

module.exports={
    authenticate
}