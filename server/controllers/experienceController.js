const { createExperience, updateExperience, getExperience, deleteExperience} =  require('../services/experienceServices')

exports.PostExperience = async (req, res) => {
        const { email } = req.user;
        const experienceDetails = req.body;

        const newExperience = await createExperience(email, experienceDetails);
        return res.status(201).json(newExperience);
};

exports.PutExperience = async (req, res) => {
        const { experienceId, ...experienceDetails } = req.body;
        const { email } = req.user;

        const updatedExperience = await updateExperience(email, experienceId, experienceDetails);
        return res.status(200).json(updatedExperience);
};

exports.GetExperience = async (req, res) => {
        // Extract the user's unique identifier (email) from the verified token
        const { email } = req.user;
        const experienceList = await getExperience(email);
        
        return res.status(200).json(experienceList || []);
};

exports.DeleteExperience = async (req, res) => {
        const experienceId = req.params.id;  

        // Extract the user's unique identifier (email) from the token
        const { email } = req.user;

        const result = await deleteExperience(email, experienceId);
        res.status(200).json(result);
};
