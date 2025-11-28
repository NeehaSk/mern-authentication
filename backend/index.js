const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const authRoutes= require("./routes/auth.js")
const cookiePrser =require("cookie-parser")
const dashboardRoutes=require("./routes/dashboard.js")     // assign 
require("dotenv").config()                                 //                


app.use(cors({
    origin:"http//localhost:5173",
    credentials:true,
})) 
                                         //cors() allows frontend and backend to communicate.
app.use(express.urlencoded({extended:true}))             //from fend api/server data accesss cheskodaniki
app.use(express.json())


mongoose.connect(process.env.MONGODB_URL)                 // data connection 
.then(()=>{
    console.log("DB connected")
})
.catch((err)=>{
    console.log(err)
})
app.get("/",(req,res)=>res.json({"message":"dummy route"}))
app.use("/api",authRoutes)
app.use("/api",dashboardRoutes) // passing routes

app.listen(process.env.PORT,()=>
    console.log("Started server")) // to start server











