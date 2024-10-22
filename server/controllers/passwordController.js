const { requestPasswordReset, resetPassword } = require('../services/passwordServices');

// Request Password Reset Controller
exports.requestPasswordReset = async (req, res) => {
        const { email } = req.body;
        await requestPasswordReset(email);
        res.status(200).json({ message: 'OTP sent to your email' });
};

// Reset Password Controller
exports.resetPassword = async (req, res) => {
        const { email, otp, newPassword } = req.body;
        await resetPassword(email, otp, newPassword);
        res.status(200).json({ message: 'Password reset successfully' });
};
