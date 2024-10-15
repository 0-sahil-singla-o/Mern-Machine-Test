const Employee= require("../../models/employee");
const Admin= require("../../models/admin");
let employeelist= async function(req,res,next){
    try{
        const employees= await Employee.find({});
        console.log(employees)
        let adminId= req.admin._id;
        const admin= await Admin.findOne({_id:adminId})
    if(employees.length==0){
        console.log("is ot working")        
       return res.status(200).render("./newemployee.ejs",{admin});
    }
    console.log("working 2")
       return res.status(200).render("./allemployees.ejs",{employees,admin});
    }catch(err){
        return res.status(400).send({status:false,path:"server",msg:"server error during employee list request",error:err});
    }
}
let addemployee= async function(req,res,next){
    try{
        let adminId= req.admin._id;
        const admin= await Admin.findOne({_id:adminId})
        console.log(admin);
        const data= req.body;
        console.log(data);
        const employeeexist= await Employee.findOne({email:data.email});
        if(employeeexist){
            res.status(400).send({status:false,message:{path:"email",msg:"email already exists!!"}})
        }
        const currentDate = new Date();

        // Extract day, month, and year
        const day = currentDate.getDate(); // Returns the day (1-31)
        const month = currentDate.getMonth() + 1; // Returns the month (0-11), so we add 1
        const year = currentDate.getFullYear(); // Returns the full year (YYYY)

        // Format the day and month to ensure they are two digits (e.g., 05 instead of 5)
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        // Construct the date string in DD-MM-YYYY format
        const date = `${formattedDay}-${formattedMonth}-${year}`;
        const employee= await Employee({
            name:data.name,
            email:data.email,
            mobilenumber:data.mobilenumber,
            designation:data.designation,
            gender:data.gender,
            course:data.selectedCourses,
            imageupload:data.imageupload,
            date:date
        })
       await employee.save()
       const employees= await Employee.find({});
       return res.status(200).render("./allemployees.ejs",{employees},{admin});
    }catch(err){
       res.status(400).send({status:false,message:{path:"server",msg:"server error during employee addition in database!!"}})
    }
}
module.exports= {employeelist,addemployee};