const nodemailer = require('nodemailer');

const sendMail = async(request, h) => {
    
    const mailTo = request.payload.to
    const mailSubject = request.payload.subject
    const mailText = request.payload.text
    
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        auth: {
            user: process.env.OUTLOOK_USER,
            pass: process.env.OUTLOOK_PASS
        },
        tls: {
            ciphers:'SSLv3'
        }
    })
  
    const mailOptions = {
        from: 'putradandy619@outlook.co.id',
        to: mailTo,
        subject: mailSubject,
        text: mailText
    };
  
    const send = transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        }
        return 'Email sent: ' + info.response;
        
    });

}

module.exports = {
    sendMail
}