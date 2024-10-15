const express= require("express");
const router= express.Router();
const {signupvalidation,loginvalidation}=require("./validation");
const {signup,login}= require("./controller");

// admin signup route-->
router.get("/",(req,res,next)=>{
    res.render("./signup.ejs");
})
router.post("/signup",signupvalidation,signup);


// admin login route-->
router.get("/loginpage",(req,res,next)=>{
    res.render("./login.ejs")
})
router.post("/login",loginvalidation,login);


// get dashboard page after login:-->

router.get("/dashbord",(req,res,next)=>{
    res.render("./dashbord.ejs");
})


module.exports= router;