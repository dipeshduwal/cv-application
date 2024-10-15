const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { sendOtpEmail } = require('../utils/emailHelper');
const { handleServerError } = require('../utils/serverErrorHandler');
const { generateOtp, getOtpExpiration, isOtpValid } = require('../utils/otpHelper');
require('dotenv').config();

const OTP_EXPIRATION_MINUTES = 600; // Adjust OTP validity to 10 minutes

// Forgot Password - Request OTP Controller
exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const lowercasedEmail = email.toLowerCase();

        // Check if user exists
        const user = await User.findOne({ where: { email: lowercasedEmail } });
        if (!user) {
            return res.status(400).json({ message: 'Email not found' });
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

        return res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        handleServerError(res, error);
    }
};

// Reset Password Controller
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const lowercasedEmail = email.toLowerCase();

        // Check if user exists
        const user = await User.findOne({ where: { email: lowercasedEmail } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid request' });
        }

        // Validate OTP and expiration
        if (!isOtpValid(otp, user.otp, user.otpExpiresAt)) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password and clear OTP fields
        user.password = hashedPassword;
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        handleServerError(res, error);
    }
};
