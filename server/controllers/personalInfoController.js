const { createOrUpdateInfo, getInfo, deleteInfo} = require('../services/personalInfoServices');

exports.PostInfo = async (req, res) => {
        const { email: userEmail } = req.user;
        const info = req.body;
        const file = req.files?.profileImage;

        const updatedInfo = await createOrUpdateInfo(userEmail, info, file);
        res.status(201).json(updatedInfo);
};

exports.GetInfo = async (req, res) => {
        const { email: userEmail } = req.user;
        const personalInfo = await getInfo(userEmail);

        res.status(200).json(personalInfo || []);
};

exports.DeleteInfo = async (req, res) => {
        const { email: userEmail } = req.user;
        const result = await deleteInfo(userEmail);
        res.status(200).json(result);
};
