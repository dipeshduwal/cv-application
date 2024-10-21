const User = require('../models/user');

const getUserProfile = async (email) => {
    const user = await User.findOne({
        where: { email }, // Use email for lookup
        attributes: ['id', 'username', 'email'] 
    });
    
    if (!user) throw new Error('Invalid Credentials');
        return user;
};

module.exports = {
    getUserProfile,
};