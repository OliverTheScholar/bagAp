const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// Use body-parser to parse JSON data in request body
app.use(bodyParser.json());

// Route for handling POST request to /sendemail
app.post('/sendemail', (req, res) => {
  const dataURL = req.body.dataURL;

  // Use nodemailer to send email with photo attachment
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bagapp69@gmail.com',
      pass: 'bagapp123'
    }
  });

  const mailOptions = {
    from: 'bagapp69@gmail.com',
    to: 'bagapp69@gmail.com',
    subject: 'Captured Photo',
    text: 'Photo attached.',
    attachments: [
      {
        filename: 'photo.jpg',
        content: dataURL.split(';base64,').pop(),
        encoding: 'base64'
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email', error);
      res.sendStatus(500);
    } else {
      console.log('Email sent successfully', info.response);
      res.sendStatus(200);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
