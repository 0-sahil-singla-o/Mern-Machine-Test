const {body,validationResult}= require("express-validator");

const signupvalidation= [
    body("username").notEmpty().withMessage("username field is required")
                    .isLength({min:4,max:20}).withMessage("username must have  4-20 characters")
                    .isAlphanumeric().withMessage("username must only contains alphabet and numbers")
                    .trim()
                    .not().contains(' ').withMessage("username should not contain spaces in between their characters"),
    body("password").notEmpty().withMessage("password field is required")
                    .isStrongPassword({minSymbols:1,minUppercase:1,minLength:8}).withMessage("password must contains minimum 8 characters along with atleast one symbol and uppercase"),

    (req,res,next)=>{
        let result= validationResult(req);
        console.log(result);
        if(result.isEmpty()){
            next();
        }
        else{
            res.status(400).send({status:false,message:result.errors[0]})
        }
    }
]
const loginvalidation=[
            body("username").notEmpty().withMessage("username field is required"),
         
        body("password").notEmpty().withMessage("password field is required"),
            
        (req,res,next)=>{
        let result= validationResult(req);
        console.log(result);
        if(result.isEmpty()){
        next();
        }
        else{
        res.status(400).send({status:false,message:result.errors[0]})
        }
        }
]
module.exports= {signupvalidation,loginvalidation};