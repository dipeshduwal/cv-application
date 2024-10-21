const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { sendOtpEmail } = require('../utils/emailHelper');
const { generateOtp, getOtpExpiration, isOtpValid } = require('../utils/otpHelper');

const OTP_EXPIRATION_MINUTES = 600; // Adjust OTP validity to 10 minutes

const makePasswordReset = async (email) => {
    const lowercasedEmail = email.toLowerCase();

        // Check if user exists
        const user = await User.findOne({ where: { email: lowercasedEmail } });
        if (!user) {
            throw new Error('Email not found');
        }

        // Generate OTP and expiration time
        const otp = generateOtp();
        const otpExpiresAt = getOtpExpiration(OTP_EXPIRATION_MINUTES);

        // Save OTP and expiration to the user record
        user.otp = otp;
        user.otpExpiresAt = otpExpiresAt;
        await user.save();

        // Send OTP via email
        await sendOtpEmail(user.email, otp);
};

const changePassword = async (email, otp, newPassword) => {
    const lowercasedEmail = email.toLowerCase();

    // Check if user exists
    const user = await User.findOne({ where: { email: lowercasedEmail } });
    if (!user) {
        throw new Error('Invalid request');
    }

    // Validate OTP and expiration
    if (!isOtpValid(otp, user.otp, user.otpExpiresAt)) {
        throw new Error('Invalid or expired OTP');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear OTP fields
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();
};

module.exports = { makePasswordReset, changePassword};