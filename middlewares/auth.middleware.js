const jwt=require('jsonwebtoken');
const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.device=decoded.userid;
                next();
            }else{
                res.send({msg:"wrong token"})
            }
        })
    }else{
        res.send("Please login first")
    }
}
module.exports={
    authenticate
}