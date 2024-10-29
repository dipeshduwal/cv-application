const fs = require('fs');
const path = require('path');
const PersonalInfo = require('../models/personalInfo');

const savePhoto = async (file, sanitizedFullName) => {
    const uploadDir = path.join(__dirname, '../uploads/');
    const possibleExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    // Check and delete any existing file with different extensions for this user
    for (const ext of possibleExtensions) {
        const existingFilePath = path.join(uploadDir, `${sanitizedFullName}${ext}`);
        if (fs.existsSync(existingFilePath)) {
            fs.unlinkSync(existingFilePath);
        }
    }

    const fileExtension = path.extname(file.name);
    const newFileName = `${sanitizedFullName}${fileExtension}`;
    const uploadPath = path.join(uploadDir, newFileName);
    await file.mv(uploadPath);
    return `/uploads/${newFileName}`;
};

const deletePhoto = (photoPath) => {
    const fullPath = path.join(__dirname, '../uploads/', path.basename(photoPath));
    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.unlink(fullPath, (unlinkErr) => {
                if (unlinkErr) console.error('Failed to delete photo:', unlinkErr);
            });
        }
    });
};

const createOrUpdateInfo = async (userEmail, info, file) => {
    const existingInfo = await PersonalInfo.findOne({ where: { userEmail } });

    const sanitizedFullName = info.fullName ? info.fullName.replace(/[^a-zA-Z0-9]/g, '_') : 'Unknown_User';
    let photoPath = existingInfo ? existingInfo.photo : null;

    if (file) {
        photoPath = await savePhoto(file, sanitizedFullName);
    } else if (!file && existingInfo) {
        if (photoPath) {
            deletePhoto(photoPath);
        }
        photoPath = null;
    }

    if (!info.personalEmail || !info.phone || !info.address || !info.birthDate) {
        throw new Error('All required fields must be filled.');
    }

    if (existingInfo) {
        await existingInfo.update({
            ...info,
            photo: photoPath,
        });
    } else {
        await PersonalInfo.create({ userEmail, ...info, photo: photoPath });
    }

    const updatedInfo = await PersonalInfo.findOne({ where: { userEmail } });
    if (updatedInfo && updatedInfo.photo) {
        updatedInfo.photo += `?t=${new Date().getTime()}`; // Prevent caching issues
    }

    return updatedInfo;
};

const getInfo = async (userEmail) => {
    const personalInfo = await PersonalInfo.findOne({ where: { userEmail } });
    if (!personalInfo) {
        return null;
    }
    return personalInfo;
};


const deleteInfo = async (userEmail) => {
    const result = await PersonalInfo.destroy({ where: { userEmail } });
    if (!result) throw new Error('Personal info not found');
    return { message: 'Personal info deleted successfully' };
};

module.exports = {
    createOrUpdateInfo,
    getInfo,
    deleteInfo,
};
