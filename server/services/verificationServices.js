const User = require('../models/user');

const OtpVerification = async (email, otp) => {
    const lowercasedEmail = email.toLowerCase();

        // Find the user by email
        const user = await User.findOne({ where: { email: lowercasedEmail } });
        if (!user) {
           throw new Error('User not found.');
        }

        // Check if the OTP matches and is not expired
        if (user.otp !== otp || new Date() > user.otpExpiresAt) {
            throw new Error('Invalid or expired OTP.');
        }

        // Mark the user as verified by clearing the OTP and expiration date
        user.isEmailVerified = true;
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        return { message: 'Email verified successfully.' };
};

module.exports = {OtpVerification};