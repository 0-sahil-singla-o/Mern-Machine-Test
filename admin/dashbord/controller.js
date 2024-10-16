const Employee= require("../../models/employee");
const Admin= require("../../models/admin");
const path= require("path");
let employeelist= async function(req,res,next){
    try{
        const employees= await Employee.find({});
        let adminId= req.admin._id;
        const admin= await Admin.findOne({_id:adminId})
    if(employees.length==0){
        
       return res.status(200).render("./newemployee.ejs",{admin});
    }
       return res.status(200).render("./allemployees.ejs",{employees,admin,  totalCount: employees.length });
    }catch(err){
        return res.status(400).send({status:false,path:"server",msg:"server error during employee list request",error:err});
    }
}
let addemployee= async function(req,res,next){
    try{
        let adminId= req.admin._id;
        const admin= await Admin.findOne({_id:adminId})
        const imagepath= req.file;
        console.log(admin);
        const data= req.body;
        console.log(data)
        console.log(data.gender);
        const employeeexist= await Employee.findOne({email:data.email});
        console.log(employeeexist)
        if(employeeexist){
            console.log("hello")
            res.status(400).send({status:false,message:{path:"emailserver",msg:"email already exists!!"}})
        }
        if(data.gender=="no gender selected"){
            res.status(400).send({status:false,message:{path:"gender",msg:"no gender selected!!"}})
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
            imageupload:imagepath,
            date:date
        })
      try{
        await employee.save()
      }catch(err){
        console.log("err",err)
      }
       
       console.log("hello")
       const employees= await Employee.find({});
       console.log(employees);
       return res.status(200).render("./allemployees.ejs",{employees,admin, totalCount: employees.length });
    }catch(err){
       res.status(400).send({status:false,message:{path:"server",msg:"server error during employee addition in database!!"}})
    }
}
let createemployee= async function(req,res,next){
        let adminId= req.admin._id;
        const admin= await Admin.findOne({_id:adminId})
        res.status(200).render("./newemployee.ejs",{admin});
}
let editemployee= async function(req,res,next){
    let adminId= req.admin._id;
    const admin= await Admin.findOne({_id:adminId})
    let employeeId= req.params.employeeId
    console.log(employeeId)
    let employee= await Employee.findOne({_id:employeeId});
    res.status(200).render("./editemployee.ejs",{employee,admin})
}
let updatedetails= async function(req,res,next){
    let adminId= req.admin._id;
    const admin= await Admin.findOne({_id:adminId})
    let employeeId= req.params.employeeId
    const imagepath= req.file;
    let data= req.body;
    if(data.gender=="no gender selected"){
        res.status(400).send({status:false,message:{path:"gender",msg:"no gender selected!!"}})
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
    await Employee.updateOne({_id:employeeId},{
        name:data.name,
        email:data.email,
        mobilenumber:data.mobilenumber,
        designation:data.designation,
        gender:data.gender,
        course:data.selectedCourses,
        imageupload:imagepath,
        date:date
    })
    const employees= await Employee.find({});
  res.status(200).render("./allemployees.ejs",{employees,admin})
}
let deleteemployee= async function(req,res,next){
    let adminId= req.admin._id;
    const admin= await Admin.findOne({_id:adminId})
    let employeeId= req.params.employeeId
    console.log(employeeId)
    await Employee.deleteOne({_id:employeeId});
    const employees= await Employee.find({});
    if(employees.length==0){
        
        return res.status(200).render("./newemployee.ejs",{admin});
     }
    res.status(200).render("./allemployees.ejs",{employees,admin, totalCount: employees.length })
}
module.exports= {employeelist,addemployee,createemployee,editemployee,updatedetails,deleteemployee};