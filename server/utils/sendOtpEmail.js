const nodemailer = require('nodemailer');

exports.sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Or use your preferred email provider
        auth: {
            user: process.env.SMTP_USER,  // Your email
            pass: process.env.SMTP_PASSWORD,  // Your email password
        },
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Your Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
};
