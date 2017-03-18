let nodemailer = require('nodemailer');

// Create a SMTP transporter object
let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_CO,
    auth: {
        user: process.env.EMAIL_U,
        pass: process.env.EMAIL_P
    },
}, {
    // default message fields

    // sender info
    from: `Turf <${process.env.EMAIL_U}>`
});

exports.send = function send(){
  console.log('Email sending...');
  let message = {

    // Comma separated list of recipients
    to: 'Clarence Lee <clarence@dubishere.com>',

    // Subject of the message
    subject: 'Message for you!', //

    // plaintext body
    text: 'Message for you!',

    // HTML body
    html: `<h1>Message for you!<h1/>`,

    // Apple Watch specific HTML body
    watchHtml: '<b>Watch it</b> Mister'
  }
  transporter.sendMail(message, (error, info) => {
    if (error) {
        console.log('Email error occurred');
        console.log(error.message);
        return;
    }
    console.log('Email sent successfully!');
    console.log('Server responded with "%s"', info.response);
    transporter.close();
});
}