
const express= require("express")
const {userModel}= require("../Module/user.module")
const jwt= require("jsonwebtoken")
const bcrypt= require("bcrypt")
const UserRoute= express.Router()
UserRoute.use(express.json())

UserRoute.post("/register",async(req,res)=>{
    const {name,email,pass}= req.body
    try {
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err) res.send({"msg":"something went wrong","error":err.message})
            else{
                const user= new userModel({name,email,pass:hash})
                await user.save()
                res.send({"msg":"New user regestered","user":user})
            }
        })
    } catch (error) {
        res.send(error)
    }
})

UserRoute.post("/login", async(req,res)=>{
    const {email,pass}= req.body
    try {
        const user= await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(pass,user[0].pass,(err,result)=>{
                if(result){
                    const token = jwt.sign({ userId:user[0]._id }, 'masai')
                    res.send({"msg":"LogIn successful","token":token})
                }
                else{
                    res.send("Something went wrong")
                }
            })           
        }
        else{
            res.send("Something went wrong")
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports={
    UserRoute
}