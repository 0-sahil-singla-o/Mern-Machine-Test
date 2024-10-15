const Admin= require("../../models/admin");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken"); 

// signup route handler-->
async function signup(req,res,next){
    try{
        let data= req.body;

        // using bcrpyt to hash the password-->
        let hashedpassword= await bcrypt.hash(data.password,10);
        
        let admin= new Admin({
            username:data.username,
            password:hashedpassword,
        })
    
        await admin.save();
    
        res.status(200).render("./login.ejs");
    }catch(err){
        res.status(400).send({
            status:false,
            message:{path:"server",msg:"server error during the signup request"}
        })
    }
}

// login route handler-->
    async function login(req,res,next){
        try{
            let data= req.body;
            let admin= await Admin.findOne({username:data.username});
            if(!admin){
                return res.status(400).send({
                    status:false,
                    message:{path:"username",msg:"admin does not exist!!"}
                })
            }
            if(!(await bcrypt.compare(data.password,admin.password))){
                return res.status(400).send({
                    status:false,
                    message:{
                        path:"password",
                        msg:"password is wrong, please enter correct password!!"
                    }
                })
            }
            console.log("hello")
            let token= await admin.generatetoken();
           
            console.log(token);
            res.status(200).json({
             token:token,
             path:"/onaboarding/dashbord"
            })
        }catch(err){
            res.status(400).send({status:false,message:{path:"server",msg:"server error during login request"}});
        }
      
    }
module.exports= {signup,login};