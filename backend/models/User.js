const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:String,
    mobile:Number,
    gender:String,
    address:String
})

module.exports = mongoose.model("User",UserSchema) 