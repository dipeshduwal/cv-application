const { getUserProfile, saveUserPreferences} = require('../services/userServices');

exports.GetProfile = async (req, res) => {
        const { email } = req.user; // Extract email from authenticated token
        const user = await getUserProfile(email);
        res.status(200).json(user);
};

exports.SavePreferences = async (req, res) => {
        const { email, accentColor, textColor, font} = req.body;
        const result = await saveUserPreferences(email, accentColor, textColor, font);
        if (!result.success) {
                return res.status(500).json({ message: 'Failed to save preferences' });
            }
        res.status(200).json({ message: result.message });
    };
        
    
