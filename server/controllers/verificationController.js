const User = require('../models/user'); // Your User model
const { handleServerError } = require('../utils/serverErrorHandler');

// Verify OTP Controller
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const lowercasedEmail = email.toLowerCase();

        // Find the user by email
        const user = await User.findOne({ where: { email: lowercasedEmail } });
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        // Check if the OTP matches and is not expired
        if (user.otp !== otp || new Date() > user.otpExpiresAt) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }

        // Mark the user as verified by clearing the OTP and expiration date
        user.isEmailVerified = true;
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully.' });
    } catch (err) {
        console.error(err);
        handleServerError(res, err);
    }
};
