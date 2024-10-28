const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { sendOtpEmail } = require('../utils/emailHelper');
const { generateOtp, getOtpExpiration, isOtpValid } = require('../utils/otpHelper');

const OTP_EXPIRATION_MINUTES = 600;

const requestPasswordReset = async (email) => {
    const lowercasedEmail = email.toLowerCase();

    const user = await User.findOne({ where: { email: lowercasedEmail } });
    if (!user) {
        throw new Error('Email not found');
    }

    const otp = generateOtp();
    const otpExpiresAt = getOtpExpiration(OTP_EXPIRATION_MINUTES);

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    sendOtpEmail(user.email, otp);
};

const resetPassword = async (email, otp, newPassword) => {
    const lowercasedEmail = email.toLowerCase();

    const user = await User.findOne({ where: { email: lowercasedEmail } });
    if (!user) {
        throw new Error('Invalid request');
    }

    if (!isOtpValid(otp, user.otp, user.otpExpiresAt)) {
        throw new Error('Invalid or expired OTP');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();
};

module.exports = {
    requestPasswordReset,
    resetPassword,
};
