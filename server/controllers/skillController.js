const { createSkill, updateSkill, deleteSkill, getSkill} = require('../services/skillServices');

exports.PostSkill = async (req, res) => {
        const skillDetails = req.body;
        const { email } = req.user; 

        const newSkill =  await createSkill(email, skillDetails);
        return res.status(201).json(newSkill);
};

exports.GetSkill = async (req, res) => {
        const { email } = req.user;
        const skillList = await getSkill(email);

        return res.status(200).json(skillList || []);
};

exports.PutSkill = async (req, res) => {
        const { email } = req.user;
        const { skillId, ...skillDetails} = req.body;
        const updatedSkill = await updateSkill(email, skillId, skillDetails);
        return res.status(200).json(updatedSkill);
};

exports.DeleteSkill = async (req, res) => {
        const skillId = req.params.id;  

        // Extract the user's unique identifier (email) from the token
        const { email } = req.user;
        const result = await deleteSkill(email, skillId);

        return res.status(200).json(result);
};
