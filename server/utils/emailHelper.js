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
        subject: 'Your Resume Builder OTP', 
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

exports.sendContactEmail = async (name, email, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.SMTP_USER,
        subject: `New message from ${name}`,
        text: `You have received a new message from ${name} (${email}):\n\n${message}`,
        html: `
            <div style="font-family: Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h1 style="color: green; text-align: center;">New Message from Resume Builder</h1>
                <div style="margin-bottom: 20px;">
                    <p style="font-size: 16px; margin: 0;"><strong>Name:</strong> ${name}</p>
                    <p style="font-size: 16px; margin: 0;"><strong>Email:</strong> ${email}</p>
                </div>
                <div style="border: 1px solid #ddd; border-radius: 5px; padding: 15px; background-color: #fff; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);">
                    <p style="font-size: 16px; margin: 0;"><strong>Message:</strong></p>
                    <p style="white-space: pre-line; font-size: 16px; margin: 0;">${message}</p>
                </div>
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
        console.error('Error sending contact email:', error);
        throw new Error('Could not send contact email.');
    }
};
