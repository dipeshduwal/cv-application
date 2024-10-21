const { makePasswordReset, changePassword } = require('../services/passwordServices');
const { handleServerError } = require('../utils/serverErrorHandler');

// Forgot Password - Request OTP Controller
exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        await makePasswordReset(email);
        return res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        console.error('Error in requestPasswordReset:', error);
        handleServerError(res, error);
    }
};

// Reset Password Controller
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        await changePassword(email, otp, newPassword);
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error in resetting password:', error);
        handleServerError(res, error);
    }
};
