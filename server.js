const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const multer = require('multer');
const app = express();

// Serve static files from the public directory

app.use(express.static('bagapp', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'text/javascript');
    } else if (path.endsWith('.html')) {
      res.set('Content-Type', 'text/html');
    }
  }
}));


app.get('/favicon.ico', (req, res) => res.status(204));

// Route for handling GET requests to the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Use body-parser to parse JSON data in request body
app.use(bodyParser.json());

// Set up multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for handling POST request to /sendemail
app.post('/sendemail', upload.single('photo'), (req, res) => {
  const photoBuffer = req.file.buffer;

  // Use nodemailer to send email with photo attachment
  const transporter = nodemailer.createTransport({
    service: 'Zoho',
    auth: {
      user: 'bagapp@zohomail.com',
      pass: '1drHPSFMUPVh'
    }
  });

  const mailOptions = {
    from: 'bagapp@zohomail.com',
    to: 'bagapp69@gmail.com',
    subject: 'Captured Photo',
    text: 'Photo attached.',
    attachments: [
      {
        filename: 'photo.jpg',
        content: photoBuffer
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email', error);
      res.status(500).json({ success: false, error: 'Error sending email' });
    } else {
      console.log('Email sent successfully', info.response);
      res.status(200).json({ success: true });
    }
  });
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});
