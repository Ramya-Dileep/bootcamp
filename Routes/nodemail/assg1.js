require('dotenv').config();

const nodemailer = require('nodemailer');

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

    to: 'parakulangara.ramya@gmail.com,ashin.jnv@gmail.com', // List of recipients

    subject: 'Assignment Link of LMS', // Subject line

    text: 'Hi....Please find the assignment link ! https://github.com/Ramya-Dileep/LMS.git', // Plain text body

};



transport.sendMail(mailOptions, function(err, info) {

   if (err) {

     console.log(err)

   } else {

     console.log(info);

   }

});