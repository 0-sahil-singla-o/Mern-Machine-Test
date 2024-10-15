const mongoose= require("mongoose");

const employeeschema= new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    mobilenumber:{type:Number, required:true,unique:true},
    designation:{type:String,enum:["HR","Manager","sales"],required:true},
    gender:{type:String,enum:["M","F"],required:true},
    course:{type:Array,required:true},
    imageupload:{type:String,required:true},
    date:{type:String}
})

const Employee= mongoose.model("Employee",employeeschema);

module.exports=Employee;