const {OtpVerification} = require('../services/verificationServices');
const { handleServerError } = require('../utils/serverErrorHandler');

exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const result = await OtpVerification(email, otp);

        res.status(200).json(result);
    } catch (err) {
        console.error('Error in verifyOtp:', err);
        handleServerError(res, err);
    }
};
