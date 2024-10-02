const User = require('../models/user');
const { handleServerError } = require('../utils/serverErrorHandler');

exports.GetProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'username', 'email'] 
        });
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        res.status(200).json(user);
    } catch (err) {
        handleServerError(res, error);  
    }
};