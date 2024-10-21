const { requestPasswordReset, resetPassword } = require('../services/passwordServices');
const { handleServerError } = require('../utils/serverErrorHandler');

// Request Password Reset Controller
exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        await requestPasswordReset(email);
        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        console.error('Error in requestPasswordReset:', error);
        handleServerError(res, error);
    }
};

// Reset Password Controller
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        await resetPassword(email, otp, newPassword);
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        handleServerError(res, error);
    }
};
