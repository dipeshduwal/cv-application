const { createSkill, updateSkill, deleteSkill, getSkill} = require('../services/skillServices');
const { handleServerError } = require('../utils/serverErrorHandler');

exports.PostSkill = async (req, res) => {
    try {
        const skillDetails = req.body;
        const { email } = req.user; 

        const newSkill =  await createSkill(email, skillDetails);
        return res.status(201).json(newSkill);
    } catch (error) {
        console.error('PostSkill Error:', error);
        handleServerError(res, error);
    }
};

exports.GetSkill = async (req, res) => {
    try {
        const { email } = req.user;
        const skillList = await getSkill(email);

        if (!skillList.length) {
            return res.status(404).json({ message: "No skill records found"});
        }
        return res.status(200).json(skillList);
    } catch (error) {
        console.error('GetSkill Error:', error);
        handleServerError(res, error);
    }
};

exports.PutSkill = async (req, res) => {
    try {
        const { email } = req.user;
        const { skillId, ...skillDetails} = req.body;
        const updatedSkill = await updateSkill(email, skillId, skillDetails);
        return res.status(200).json(updatedSkill);
    } catch (error) {
        console.error('PutSkill Error:', error);
        handleServerError(res, error);
    }
};

exports.DeleteSkill = async (req, res) => {
    try {
        const skillId = req.params.id;  

        // Extract the user's unique identifier (email) from the token
        const { email } = req.user;
        const result = await deleteSkill(email, skillId);

        return res.status(200).json(result);
    } catch (error) {
        console.error('DeleteSkill Error:', error);
        handleServerError(res, error);
    }
};
