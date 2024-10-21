const Skill = require('../models/skill');

const createSkill = async (email, skillDetails) => {
    const { skillName } = skillDetails;

    const newSkill = await Skill.create({
        userEmail: email,
        skillName,
    });

    return newSkill;
};

const updateSkill = async (email, skillId, skillDetails) => {
    const existingSkill = await Skill.findOne({
        where: { id: skillId, userEmail: email }  // Use the email to verify ownership
    });

    if (!existingSkill) {
        throw new Error('Skill record not found or you do not have permission to edit');
    }

    const updatedSkill = await existingSkill.update(skillDetails);

    return updatedSkill;
};

const getSkill = async (email) => {
    const skillList = await Skill.findAll({ where: { userEmail: email } });

        if (!skillList || skillList.length === 0) {
            return [];
        }

        return skillList;
};

const deleteSkill = async (email, skillId) => {
    const skill = await Skill.findOne({ 
        where: { 
            id: skillId,  
            userEmail: email 
        }
    });

    if (!skill) {
        throw new Error('Skill record not found or you do not have permission to delete');
    }

    await skill.destroy();
    return { message: 'Skill record deleted successfully' };
};

module.exports = {
    createSkill, updateSkill, getSkill, deleteSkill
};
