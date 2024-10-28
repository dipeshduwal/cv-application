const Education = require('../models/education');

const createEducation = async (email, educationDetails) => {
    const { school, degree, fieldOfStudy, startDate, endDate, description } = educationDetails;

    const newEducation = await Education.create({
        userEmail: email,
            school,
            degree,
            fieldOfStudy,
            startDate,
            endDate,
            description
    });

    return newEducation;
};

const updateEducation = async (email, educationId, educationDetails) => {
    const existingEducation = await Education.findOne({
        where: { id: educationId, userEmail: email }
    });

    if (!existingEducation) {
        throw new Error('Education record not found or you do not have permission to edit');
    }

    const updatedEducation = await existingEducation.update(educationDetails);

    return updatedEducation
};

const getEducation = async (email) => {
    const educationList = await Education.findAll({ where: { userEmail: email } });

        if (!educationList || educationList.length === 0) {
            return [];
        }

        return educationList;
};

const deleteEducation = async (email, educationId) => {
    const education = await Education.findOne({ 
        where: { 
            id: educationId, 
            userEmail: email 
        }
    });

    if (!education) {
        throw new Error('Education record not found or you do not have permission to delete');
    }

    await education.destroy();
    return { message: 'Education record deleted successfully' };
};

module.exports = {
    createEducation, updateEducation, getEducation,deleteEducation,
};