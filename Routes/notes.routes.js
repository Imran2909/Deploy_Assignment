const express= require("express")
const {noteModel}= require("../Module/notes.model")
const jwt= require("jsonwebtoken")
const bcrypt= require("bcrypt")
const NotesRoute= express.Router()
NotesRoute.use(express.json())

NotesRoute.get("/", async(req,res)=>{
    const data= await noteModel.find()
    res.send(data)
})

 
NotesRoute.post("/create",async(req,res)=>{
        const payload=req.body
    const note= new noteModel(payload)
    await note.save()
    res.send({"msg":"notes created"})
})


NotesRoute.delete("/delete/:id",async(req,res)=>{
    const ID= req.params.id
    await noteModel.findByIdAndDelete({_id:ID})
    res.send({"msg":"Note deleted"})
})


NotesRoute.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const ID= req.params.id
    await noteModel.findByIdAndUpdate({_id:ID},payload)
    res.send({"msg":"Note Updated"})
})


module.exports={
    NotesRoute
}