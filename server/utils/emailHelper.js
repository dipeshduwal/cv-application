const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendOtpEmail = async (email, otp) => { 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,     
            pass: process.env.SMTP_PASSWORD,  
        },
    });

    const mailOptions = {
        from: process.env.SMTP_USER,         
        to: email,                        
        subject: 'Your Password Reset OTP', 
        text: `Your OTP for password reset is: ${otp}`, 
        html: `
            <div style="font-family: Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
                <h1 style="text-align: center; color: green;">Welcome to Resume Builder!</h1>
                <p style="font-size: 18px; text-align: center; color: #333;">
                    Your OTP for password reset is: <strong style="color: red;">${otp}</strong>
                </p>
                <div style="text-align: center; margin-top: 10px;">
                    <img src="https://i.imgur.com/9UEf0Bs.png" alt="Resume Builder" style="max-width: 100%; height: 70px; border-radius: 10px;">
                </div>
                <p style="font-size: 16px; color: #555; text-align: center; margin-top: 20px;">
                    Build your resume with our easy-to-use application. <br>
                    If you didn’t request this OTP, please ignore this email.
                </p>
                <footer style="margin-top: 30px; text-align: center;">
                    <p style="font-size: 14px; color: #999;">
                        © 2024 Resume Builder Inc. All rights reserved.
                        <span style="font-size: 12px; color: #aaa;">Timestamp: ${new Date().toLocaleString()}</span>
                    </p>
                </footer>
            </div>`
        
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Could not send OTP email.');
    }
};
