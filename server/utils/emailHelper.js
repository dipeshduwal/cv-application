const nodemailer = require('nodemailer');
require('dotenv').config();

// Function to send OTP via email
exports.sendOtpEmail = async (email, otp) => {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your preferred email service
        auth: {
            user: process.env.SMTP_USER,      // Your email address (e.g., your-email@gmail.com)
            pass: process.env.SMTP_PASSWORD,   // Your email password or app password
        },
    });

    // Email options
    const mailOptions = {
        from: process.env.SMTP_USER,         // Sender email address
        to: email,                            // Recipient email address
        subject: 'Your Password Reset OTP',   // Subject line
        text: `Your OTP for password reset is: ${otp}`, // Email body
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Could not send OTP email.'); // Throw a more generic error
    }
};
