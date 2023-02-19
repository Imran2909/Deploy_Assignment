const express= require("express")
const {connection}= require("./db")
const {userModel}= require("./Module/user.module")
const jwt= require("jsonwebtoken")
const bcrypt= require("bcrypt")
const app=express()
app.use(express.json())
const {NotesRoute}= require("./Routes/notes.routes")
const {UserRoute}= require("./Routes/user.route")
const {authenticate}= require("./middleware/middleware")
// const cors= require("cors")
// app.use(cors())
app.get("/",(req,res)=>{
    res.send("Hello")
})

app.use("/user",UserRoute)
app.use(authenticate)
app.use("/note",NotesRoute)


app.listen(1100, async()=>{
    try {
        await connection
        console.log("Connected to server")
    } catch (error) {
        console.log("Cannot connected to server")
    }
    console.log("server is running at port no 1100")
})