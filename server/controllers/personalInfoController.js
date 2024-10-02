const PersonalInfo = require('../models/personalInfo');

exports.GetInfo = async (req, res) => {
    try {
        const personalInfo = await PersonalInfo.findOne();
        res.status(200).json(personalInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};