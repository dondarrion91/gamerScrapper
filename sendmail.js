function sendMail(message) {
    require("dotenv").config();
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        host: process.env.HOST,
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.FROM,
        to: process.env.TO,
        subject: "novedades del procesador",
        text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

module.exports = sendMail;
