const express= require("express");
const app= express();
const mongoose= require("mongoose");
const path=require("path");
const ejsMate= require("ejs-mate");
const verifyjwt= require("./middlewares/verify");
const onaboardingrouter= require("./admin/onaboarding/routes");
const dashbordrouter= require("./admin/dashbord/routes");
// connecting to the database:->
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/admin');
    }
main().then(()=>{
    console.log("connected to the database")
})

//req.body parsing middlewares-->
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// setting static folder for css files-->
app.use(express.static(path.join(__dirname,"/public")));

// so i am using ejs engine to render html pages because, right now i am not familiar with react but i am learning it:-->
app.set("views engine","ejs");
app.set('views', path.join(__dirname, 'views'));
app.engine("ejs",ejsMate);
//middlewares to get inside the modules-->
app.use("/onaboarding",onaboardingrouter);
app.use(verifyjwt);
app.use("/dashbord",dashbordrouter);
app.get("/",(req,res,next)=>{
    res.status(200).send({
        status:true,
        message:"welcome to the root"
    })
})


// start the server
const port=4000;
app.listen(port,()=>{
    console.log("server is running");
})