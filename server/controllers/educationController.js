const { createEducation, updateEducation, getEducation, deleteEducation} = require('../services/educationServices');

exports.PostEducation = async (req, res) => {
        const { email } = req.user;  
        const educationDetails = req.body;

        const newEducation = await createEducation(email, educationDetails);
        return res.status(201).json(newEducation);
};

exports.PutEducation = async (req, res) => {
        const { email } = req.user;
        const { educationId, ...educationDetails} = req.body;

        const updatedEducation = await updateEducation(email, educationId, educationDetails);
        return res.status(200).json(updatedEducation);
};

exports.GetEducation = async (req, res) => {
        const { email } = req.user;

        const educationList = await getEducation(email);

        return res.status(200).json(educationList || []);
};

exports.DeleteEducation = async (req, res) => {
        const educationId = req.params.id;

        const { email } = req.user;

        const result = await deleteEducation(email, educationId);
        return res.status(200).json(result);
};
