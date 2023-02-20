const express=require("express");
const app=express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const postRouter=express.Router();
const {postmodel}=require("../models/posts.model")

app.use(express.json());

postRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"masai",async(err,decoded)=>{
            if(decoded){
                const posts= await postmodel.find({device:decoded.userid})
                res.send(posts)
            }else{
                res.send({msg:"wrong token"})
            }
        })
    }else{
        res.send("Please login first")
    }
})
postRouter.post("/create",async(req,res)=>{
    try {
        const payloade=req.body;
        const newpost= await postmodel(payloade);
        newpost.save();
        res.send({msg:"new post created"})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    }
})
postRouter.patch("/update/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const payloade=req.body;
        await postmodel.findByIdAndUpdate(id,payloade)
        res.send({"msg":`post with id:${id} has been updated`})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    
    }
})
postRouter.delete('/delete/:id',async(req,res)=>{
    const postId=req.params.id;
    await postmodel.findByIdAndDelete({_id:postId})
    res.send({"msg":`post with id:${postId} has been deleted`})
})


module.exports={
    postRouter
}