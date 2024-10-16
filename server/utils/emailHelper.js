const nodemailer = require('nodemailer');
require('dotenv').config();

// Function to send OTP via email
exports.sendOtpEmail = async (email, otp) => {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your preferred email service
        auth: {
            user: process.env.SMTP_USER,     
            pass: process.env.SMTP_PASSWORD,  
        },
    });

    // Email options
    const mailOptions = {
        from: process.env.SMTP_USER,         
        to: email,                            
        subject: 'Your Password Reset OTP',  
        text: `Your OTP for password reset is: ${otp}`, 
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Could not send OTP email.');
    }
};
