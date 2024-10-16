const {body,validationResult}= require("express-validator");

const employeevalidation= [
    body("name").notEmpty().withMessage("name field is required")
                    .isLength({min:4,max:20}).withMessage("name must have  4-20 characters")
                    .isAlphanumeric().withMessage("name must only contains alphabet and numbers")
                    .trim()
                    .not().contains(' ').withMessage("name should not contain spaces in between their characters"),
                    // console.log(body("email")),
    body("email").notEmpty().withMessage("email field is required")
                 .isEmail().withMessage("email is Invalid"),
    body("mobilenumber").notEmpty().withMessage("Mobile No. field is required"),
    body("gender").custom(value=>{if(value=="no gender selected"){   throw new Error('gender must be selected');}return true}),
    body("selectedCourses").notEmpty().withMessage("course must be selected"),              
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

module.exports= {employeevalidation};