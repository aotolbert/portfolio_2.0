const util = require('util');
const fs = require('fs');
var staticModule = require('static-module')
const express = require('express');
var path = require("path");
//var sendEmail = require("../functions/send-contact-email");
const nodemailer = require('nodemailer');
require('dotenv').config();

const router = express.Router();


router.use('/favicon.ico', express.static(__dirname + '\static/favicon.ico', { maxAge: '1y' }));

// Set default caching headers
router.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache');
    next();
  });

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../app/index.html"));
})

router.get("/upcoming", (req, res) => {
    res.sendFile(path.join(__dirname, "../app/upcoming.html"));
})

router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../app/about.html"));
})

router.get("/work", (req, res) => {
    res.sendFile(path.join(__dirname, "../app/work.html"));
})

router.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "../app/contact.html"));
})

router.get("/contactSuccess", (req, res) => {
    res.sendFile(path.join(__dirname, "../app/contactSuccess.html"));
})

router.post('/send', (req, res) => {

// async..await is not allowed in global scope, must use a wrapper
async function main() {

    console.log(req.body);

    var output  = `
    <p>You have a new Message!</>
    <h3> Contact Details</h3>
    <ul>
        <li>Name:${req.body.firstName} ${req.body.lastName}</li>
        <li>Phone Number:${req.body.phoneNumber}</li>
    </ul>
    <h3>Message:</h3>
    <p>
        ${req.body.emailContent}
    </p>
    `;


    console.log(output);
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SEND_IN_BLUE_USER,
        pass: process.env.SEND_IN_BLUE_PASS
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      //from: '"Fred Foo 👻" <foo@example.com>', // sender address
      from: `${req.body.firstName} ${req.body.lastName} <${req.body.returnEmailAddress}>`,
      to: "aotolbert@gmail.com", // list of receivers
      subject: "New Nerve Museum Email", // Subject line
      html: output
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main()
  .then(res.redirect('/contactSuccess'))
  .catch(console.error);



})


// let transporter = nodemailer.createTransport({
//     host: "smtp.example.com",
//     port: 587,
//     secure: false, // upgrade later with STARTTLS
//     auth: {
//       user: "username",
//       pass: "password"
//     }
//   });




router.get('/sw.js', (req, res) => {
    console.log(__dirname)
const input = fs.createReadStream(`${__dirname}/../app/sw.js`);

const toCache = [
  './index.html',
  './offline.html',
  './styles.css',
  './debatinator.js'
]

res.set('Cache-Control', 'public, max-age=31557600'); // one year
res.set('Content-Type', 'application/javascript');
    input.pipe(res);
});


module.exports = router;