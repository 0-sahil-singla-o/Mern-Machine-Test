const multer= require("multer");
const path= require("path");
const fs= require("fs");

const storage= multer.diskStorage({
    destination:function(req,file,cb){
        const {email}= req.body
        let folder= `./public/images/${email}/`;
          // Create the folder if it doesn't exist
          if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
                         }
        cb(null,folder)
    },
    filename:function(req,file,cb){
        const {email}= req.body
        cb(null, email+"-"+ file.fieldname + Date.now() + path.extname(file.originalname));
    }
})

// initialize multer with the storage engine:--->

const upload = multer({ storage: storage });

module.exports= upload;