const express=require('express');
const router=require('./src/route/api');
const app=new express();
const bodyParser=require('body-parser');
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const mongoSanitize=require('express-mongo-sanitize');
const hpp=require('hpp');
const cors=require('cors');
const mongoose=require('mongoose');



//Security
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb'}));
app.use(bodyParser.json())


// Rate Limiting
const limiter=rateLimit({windowMs:15*60*1000,max:300});
app.use(limiter);


// Database Connection
let URI="mongodb+srv://<username>:<password>@cluster0.7uslu.mongodb.net/CRUD4";
let OPTION={user:'testuser7777',pass:'testuser7777',autoIndex:true};
mongoose.connect(URI,OPTION).then((res)=>{
    console.log("Success")
}).catch((err)=>{
    console.log(err)
})



app.use("/api/v1",router);
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
});

module.exports=app;





