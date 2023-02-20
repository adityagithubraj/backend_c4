const express=require("express");
const connection=require("./config/db")
const {userRouter}=require("./routes/user.route")
const {postRouter}=require("./routes/posts.route")
const {authenticate}=require("./middlewares/auth.middleware")



const app=express()
const cors=require("cors");
require ("dotenv").config();
app.use(express.json())
app.use(cors());


app.use("/user",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to db");
        
    } catch (error) {
        console.log(error.message);
    }
    console.log("runig at port 4040");
})