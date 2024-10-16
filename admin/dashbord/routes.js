const express= require("express");
const router= express.Router();
const Admin=require("../../models/admin");
const {employeelist,addemployee,createemployee,editemployee,updatedetails,deleteemployee}= require("./controller");
const {employeevalidation}= require("./validation");
const upload= require("../../helpers/multer");
// route to get admin details and share it to the dashbord page-->
router.get("/dashbordpage",async (req,res,next)=>{
    try{
        let  adminId= req.admin._id;
        let admin= await Admin.findOne({_id:adminId});
        res.status(200).send({status:true,admin:admin});
    }catch(err){
        res.status(400).send({status:false,message:{path:"server",msg:"server error during dashbordpage request"}})
    }
})

//employee list route-->

router.get("/employeelist",employeelist);

// employee save to the database-->

router.post("/addemployee",employeevalidation,upload.single("imageupload"),addemployee);
//create employee route-->
router.get("/createemployee",createemployee)

//edit employee route-->

router.get("/editemployee/:employeeId",editemployee)
router.post("/updatedetails/:employeeId",employeevalidation,updatedetails)

// delete employee route-->
router.get("/deleteemployee/:employeeId",deleteemployee)
module.exports= router;