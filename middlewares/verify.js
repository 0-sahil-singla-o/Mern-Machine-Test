const jwt= require("jsonwebtoken");

function verifyjwt(req,res,next){
    try{
        const authHeader = req.headers['authorization']; // Get the Authorization header
        const token = authHeader && authHeader.split(' ')[1];
        if(token){
            let admin= jwt.decode(token,"sahil123");
            req.admin=admin;
            next()
        }
        else{
              res.status(400).send({status:false,message:{path:"server",msg:"you are not authenticated"}})
        }
    }catch(err){
        res.status(400).send({status:false,message:{path:"server",msg:"server error during token decodation"}})
    }
}

module.exports=verifyjwt;