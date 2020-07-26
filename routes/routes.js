const fs = require('fs');
const express = require('express');
var path = require("path");
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

router.get("/memoir", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/memoir.html"));
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