const Skill = require('../models/skill');
const { handleServerError } = require('../utils/serverErrorHandler');

exports.PostSkill = async (req, res) => {
    try {
        const { skillName } = req.body;
        
        // Extract the user's unique identifier (email) from the token
        const { email } = req.user;  // Assuming the token contains 'email'

        const skillData = await Skill.create({
            userEmail: email,  // Store email instead of userId
            skillName,
        });

        return res.status(201).json(skillData);
    } catch (error) {
        console.error('PostSkill Error:', error);
        handleServerError(res, error);
    }
};

exports.GetSkill = async (req, res) => {
    try {
        // Extract the user's unique identifier (email) from the verified token
        const { email } = req.user;

        // Fetch all education records for the user based on their email
        const skillList = await Skill.findAll({ where: { userEmail: email } });

        if (!skillList || skillList.length === 0) {
            return res.status(404).json({ message: 'No skill records found' });
        }

        return res.status(200).json(skillList);
    } catch (error) {
        console.error('GetSkill Error:', error);
        handleServerError(res, error);
    }
};

exports.PutSkill = async (req, res) => {
    try {
        const { skillId, skillName } = req.body;
        
        // Extract the user's unique identifier (email) from the token
        const { email } = req.user;

        const existingSkill = await Skill.findOne({
            where: { id: skillId, userEmail: email }  // Use the email to verify ownership
        });

        if (!existingSkill) {
            return res.status(404).json({ message: 'Skill record not found or you do not have permission to edit' });
        }

        const updatedSkill = await existingSkill.update({
            skillName
        });

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

        const skill = await Skill.findOne({ 
            where: { 
                id: skillId,  // Ensure the education ID matches
                userEmail: email   // Ensure the user owns this education record based on email
            }
        });

        if (!skill) {
            return res.status(404).json({ message: 'Skill record not found or you do not have permission to delete' });
        }

        await skill.destroy();
        return res.status(200).json({ message: 'Skill record deleted successfully' });
    } catch (error) {
        console.error('DeleteSkill Error:', error);
        handleServerError(res, error);
    }
};
