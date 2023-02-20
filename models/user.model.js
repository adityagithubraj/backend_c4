const mongoose = require("mongoose");
const userschema = mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    password: String,
    age: Number,
    city: String
})
const usermodel=mongoose.model("user",userschema)
module.exports={usermodel}