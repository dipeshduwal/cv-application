const {OtpVerification} = require('../services/verificationServices');
const { resendOtpService } = require('../services/verificationServices');

exports.verifyOtp = async (req, res) => {
        const { email, otp } = req.body;
        const result = await OtpVerification(email, otp);

        res.status(200).json(result);
};

exports.resendOtp = async (req, res) => {
        const { email } = req.body;
        const result = await resendOtpService(email);
        res.status(200).json(result);
};
