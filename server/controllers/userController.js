const { getUserProfile} = require('../services/userServices');

exports.GetProfile = async (req, res) => {
        const { email } = req.user; // Extract email from authenticated token
        const user = await getUserProfile(email);
        res.status(200).json(user);
};
