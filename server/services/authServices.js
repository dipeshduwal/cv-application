const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {sendOtpEmail} = require('../utils/emailHelper');
const otpHelper = require('../utils/otpHelper');
require('dotenv').config();

const signup = async (username, email, password) => {
    const lowercasedUsername = username.toLowerCase();
    const lowercasedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ where: { email: lowercasedEmail } });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = otpHelper.generateOtp();
    const otpExpiresAt = otpHelper.getOtpExpiration(600);

    const newUser = await User.create({
        username: lowercasedUsername,
        email: lowercasedEmail,
        password: hashedPassword,
        otp: otp,
        otpExpiresAt: otpExpiresAt,
        isEmailVerified: false,
    });

    sendOtpEmail(lowercasedEmail, otp);
    return { message: 'User created successully'};
};

const login = async (email, password) => {
    const lowercasedEmail = email.toLowerCase();

    const user = await User.findOne({ where: { email: lowercasedEmail } });
    if (!user) {
        throw new Error('Invalid credentials');
    }

     if (!user.isEmailVerified) {
        const otp = otpHelper.generateOtp();
        user.otp = otp;
        user.otpExpiresAt = otpHelper.getOtpExpiration(600);
        await user.save();

        sendOtpEmail(lowercasedEmail, otp);
        return { message: 'Email not verified' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET,
        { expiresIn: '24h' } 
    );

    return{
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            accentColor: user.accentColor || '#125413',
            textColor: user.textColor || '#143d15',
            font: user.font || 'Merriweather',
        },
    };
};

module.exports = { signup, login };