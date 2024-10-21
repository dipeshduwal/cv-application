const { getUserProfile} = require('../services/userServices');
const { handleServerError } = require('../utils/serverErrorHandler');

exports.GetProfile = async (req, res) => {
    try {
        const { email } = req.user; // Extract email from authenticated token
        const user = await getUserProfile(email);
        res.status(200).json(user);
    } catch (err) {
        console.error('Error in GetProfile:', err);
        handleServerError(res, err);  
    }
};
