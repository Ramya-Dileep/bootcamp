require('dotenv').config();

const nodemailer = require('nodemailer');

const otpgenerator=require('otp-generator')
const otp=otpgenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

let transport = nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 465,

    secure: true,

    auth: {

      user: process.env.EMAIL_USERNAME,

      pass: process.env.EMAIL_PASSWORD

    }

 });

const mailOptions = {

    from: 'ramyanest01@gmail.com', // Sender address

    to: 'parakulangara.ramya@gmail.com', // List of recipients

    subject: 'Otp test mail', // Subject line

    text: `Hi....Please find the otp for mail vertification ! Your otp is ${otp}`, // Plain text body

};



const mailvar=transport.sendMail(mailOptions, function(err, info) {

   if (err) {

     console.log(err)

   } else {

     console.log(info);

   }

});

// module.exports=mailvar