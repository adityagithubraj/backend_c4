const mongoose=require("mongoose")

const postschema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    no_if_comments:Number

},{versionkey:false})

const postmodel=mongoose.model("post",postschema)

module.exports={postmodel}