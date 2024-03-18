// index.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to receive feedback
app.post('/submit-feedback', (req, res) => {
    const feedback = req.body.feedback;
    const senderEmail = req.body.senderEmail; // Assuming the form field is named 'senderEmail'

    // Validate and store feedback data in your database/storage

    // Send email notification
    const transporter = nodemailer.createTransport({
        host: '74.125.195.109',
        port: 465,
        secure: true, // Use SSL/TLS
        auth: {
            user: 'aimanshafiqwork@gmail.com', // Replace with your email
            pass: 'Shafiq99' // Replace with your email password or app-specific password
        }
    });


    const mailOptions = {
        from: senderEmail, // Use sender's email from the form
        to: 'recipient@example.com', // Replace with recipient's email
        subject: 'New Feedback Received',
        text: `Feedback: ${feedback}\nEmail: ${senderEmail}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Feedback received. Email sent.');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
