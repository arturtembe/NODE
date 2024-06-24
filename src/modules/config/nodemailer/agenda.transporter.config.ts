
import nodemailer from "nodemailer"; 

const transporterAgenda = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        //clientId: process.env.OAUTH_CLIENTID,
        //clientSecret: process.env.OAUTH_CLIENT_SECRET,
        //refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});

export default transporterAgenda;
/*  
    var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'myfriend@yahoo.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
*/