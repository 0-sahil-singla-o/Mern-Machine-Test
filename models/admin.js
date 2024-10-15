const mongoose= require("mongoose");
const jwt= require("jsonwebtoken");
const adminschema= new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
})



adminschema.methods.generatetoken= async function(){
    try{
        return jwt.sign({_id:this._id},"sahil123")
    }catch(err){
        res.status(400).send({status:false,message:{path:"server",msg:"error during generation of token"}});
    }
}
const Admin= mongoose.model("Admin",adminschema);
module.exports= Admin;