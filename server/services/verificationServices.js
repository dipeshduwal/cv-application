const User = require('../models/user');
const {sendOtpEmail} = require('../utils/emailHelper');
const otpHelper = require('../utils/otpHelper');

const OtpVerification = async (email, otp) => {
    const lowercasedEmail = email.toLowerCase();

        const user = await User.findOne({ where: { email: lowercasedEmail } });
        if (!user) {
           throw new Error('User not found.');
        }

        if (user.otp !== otp || new Date() > user.otpExpiresAt) {
            throw new Error('Invalid or expired OTP.');
        }

        user.isEmailVerified = true;
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        return { message: 'Email verified successfully.' };
};

const resendOtpService = async (email) => {
    const lowercasedEmail = email.toLowerCase();
    const user = await User.findOne({ where: { email: lowercasedEmail } });
    if (!user) {
        throw new Error('User not found.');
    }

    const otp = otpHelper.generateOtp();

    user.otp = otp;
    user.otpExpiresAt = otpHelper.getOtpExpiration(600);
    await user.save();

    sendOtpEmail(user.email, otp);

    return { message: 'OTP sent successfully to your email.' };
};

module.exports = {OtpVerification, resendOtpService};