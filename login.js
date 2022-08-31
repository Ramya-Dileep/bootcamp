const express=require("express")
const bcrypt = require('bcrypt');
// const mail=require('./Routes/nodemail/mailotp')
const app= express()
const port= 5001
 const route=require('./Routes/crud')
const db= require('./dbproject')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const morgan = require('morgan')
app.use(morgan('dev'));
// DB connection
db.connect((err,res)=>{
    if(!err){
        console.log("DB connected")
    }
    else{
        console.log(err)
    }
})
// generating otp and storing to db
app.post('/users',(req,res)=>{
    // const saltRounds = 10;
    const detail=req.body;
    const otpgenerator=require('otp-generator')
    const otp=otpgenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    console.log(otp)
    let insertData=`Insert into login(email,otp)
      values ('${detail.email}','${otp}')`
    console.log(insertData)
     db.query(insertData,(err,result)=>{
         if(!err)
         {
          console.log("data inserted successfully")
          res.status(200)
        }
        else{
            console.log("data insertion failed",err)
            res.status(400)
        }
     })
    })


    // otp validation
    app.post('/email',async(req,res)=>{
        const data=req.body;
        console.log(data)
        let validdata=`Select * from login where email='${data.email}' and otp='${data.otp}'` 
        const response=await db.query(validdata)
        console.log(response)     
        if(response.rowCount==0){
            console.log('Otp failed')
        }   
        else{
            console.log("Otp valid")
        }
    })

app.listen(port,()=>{
    console.log("Server is Running")
})