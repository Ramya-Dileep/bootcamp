const express=require("express")
const bcrypt = require('bcrypt');
const app= express()
const port= 5004
const Joi=require("joi")
const db= require('./dbproject')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const morgan = require('morgan')
app.use(morgan('dev'));
const saltRounds = 10;
const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(15)
        .required(),

    password: Joi.string()
        .alphanum()
        .min(6)
        .max(20),

    phone:Joi.string()
             .length(10),

   
    birthyear: Joi.number()
        .integer()
        .min(1900)
        .max(2015),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})




// DB connection
db.connect((err,res)=>{
    if(!err){
        console.log("DB connected")
    }
    else{
        console.log(err)
    }
})

//post method
app.post('/users',(req,res)=>{
    const detail= {
        email: req.body.email,
        password:req.body.password,
        username:req.body.username,
        birthyear:req.body.birthyear,
         phone:req.body.phone
    
    }
    
    const result=schema.validate(detail);
    const val=detail.password
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(8);
    var hash = bcrypt.hashSync(val, salt);
    console.log(hash)
    
if(result.error==null){
    let dbdata=`insert into form(email,password,username,birthyear,phone) 
    values ('${detail.email}','${hash}','${detail.username}',${detail.birthyear},'${detail.phone}')`
    db.query(dbdata,(err,result)=>{
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
}



})
app.listen(port,()=>{
    console.log("Server is Running")
})