const {OtpVerification} = require('../services/verificationServices');

exports.verifyOtp = async (req, res) => {
        const { email, otp } = req.body;
        const result = await OtpVerification(email, otp);

        res.status(200).json(result);
};
