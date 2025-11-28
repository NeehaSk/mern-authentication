const express=require("express")
const router=express.Router()
const bcrypt = require("bcrypt")
const User =require("../models/User.js") //to check schema
const jwt = require("jsonwebtoken")  //It is a package (library) in Node.js. 



 const generateTokens=(user) =>{
    const accesssToken =jwt.sign(
        {id:user._id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"15m"}
    )
    const refreshToken =jwt.sign(
        {id:user._id},
        process.env,JWT_REFRESH_SECRET,
        {expiresIN:"7d"}
    )
    return{accesssToken,refreshToken}
 }


router.post("/register",async (req,res)=>{
    const {name,email, password,address,mobile,gender}=req.body

    //checking existing user or not
    const existingUser= await User.findOne({email}) // findone=create
    console.log(existingUser)
    if(existingUser){
        return res.status(409).json({"message":"User already exists"})
    }

    const hashedPassword =await bcrypt.hash(password,10)
    const newUser=new User({
        name,
        email,
        password:hashedPassword,
        gender,
        address,
        mobile
    }) 
    await newUser.save()
    res.status(201).json({"message":"User created successfully"})
})
router.post("/login",async(req,res)=>{
    const {email,password}= req.body
    const user=await User.findOne({email})
    if(!user)
        return res.status(400).json({"message":"user not found"})
    //comparing passsword
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch)
        return res.status(400).json({"message":"password is invalid"})

    // const token= jwt.sign(
    //     {id:user._id,email:user.email}, // by using object method creates unique id in mongodb
    //     process.env.JWT_SECRET,           
    //     {expiresIn:"1h"}
    // )

const {accesssToken,refreshToken} = generateTokens(user)
res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure:false,
    path:"/",
    sameSite:"lax"
})

    res.status(200).json({"message":"User identified",
        token:accesssToken,
    user:{id:user._id, name:user.name,email:user.email}
})
})

router.get("/refresh-token",async (req,res)=>{
    const token = req.cookies.refreshToken
    if(!token)
        return res.status(401).json({"message":"No token appeared"})
    try{
        const decoded=jwt.verify(token,process.env,JWT_REFRESH_SECRET)
        const user =await User.findById(decoded.id)
        const newAccessToken =jwt.sign({
            id:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:"15m"}
    )
    res.json({
        accessToken:newAccessToken,
        user:{id: user._id,email:user.email,name:user.name}
    })
    }
    catch(err){
           console.log("error from refresh token route",err)

    }
})

router.post("/logout",(req,res)=>{
    res.clearCookie("refreshToken")
    res.status(200).json({"message":'logged out successful'})
})
    


module.exports=router