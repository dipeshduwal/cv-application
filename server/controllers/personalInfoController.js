const fs = require('fs');
const path = require('path');
const PersonalInfo = require('../models/personalInfo');
const { handleServerError } = require('../utils/serverErrorHandler');

exports.PostInfo = async (req, res) => {
    try {
        const { fullName, email, phone, address, birthDate, linkedIn } = req.body;

        // Find existing personal info to check for previous photo

        const existingInfo = await PersonalInfo.findByPk(req.user.id);
        
        let previousPhotoPath = null;

        // If there's existing personal info, get the previous photo path
        if (existingInfo) {
            previousPhotoPath = existingInfo.photo; // Store the previous photo path if it exists
        }

        let photoPath = null;

        // Check if a file was uploaded
        if (req.files && req.files.profileImage) {
            const file = req.files.profileImage;
            const uploadPath = path.join(__dirname, '../uploads/', file.name);

            // Move file to the server file system
            await file.mv(uploadPath); // Using await to ensure the file is moved before proceeding

            // Save relative file path to the database
            photoPath = `/uploads/${file.name}`;
        }

        // If there's a previous photo, delete it if it exists
        if (previousPhotoPath) {
            const previousPhotoFullPath = path.join(__dirname, '../uploads/', path.basename(previousPhotoPath));
            
            
            // Check if the previous photo file exists before trying to delete it
            fs.access(previousPhotoFullPath, fs.constants.F_OK, (err) => {
                if (!err) {
                    fs.unlink(previousPhotoFullPath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('Failed to delete previous photo:', unlinkErr);
                        } else {
                            console.log('Previous photo deleted successfully:', previousPhotoFullPath);
                        }
                    });
                } else {
                    console.warn('Previous photo does not exist, skipping deletion:', previousPhotoFullPath);
                }
            });
        }

        // Create or update personal info in the database
        const personalInfo = await PersonalInfo.upsert({
            id: req.user.id, // Ensure personal info is linked to the user
            fullName,
            email,
            phone,
            address,
            birthDate,
            linkedIn,
            photo: photoPath,  // Save file path
        });

        res.status(201).json(personalInfo);
    } catch (error) {
        handleServerError(res, error);
    }
};

exports.GetInfo = async (req, res) => {
    try {
        const personalInfo = await PersonalInfo.findByPk(req.user.id);
        if (!personalInfo) {
            return res.status(404).json({ message: 'Personal info not found.' });
        }
        res.status(200).json(personalInfo);
    } catch (error) {
        handleServerError(res, error);
    }
};

exports.DeleteInfo = async (req, res) => {
    try {
        
        const result = await PersonalInfo.destroy({
            where: { id: req.user.id }
        });
        
        if (result) {
            res.status(200).json({ message: 'Personal info deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Personal info not found.' });
        }
    } catch (error) {
        handleServerError(res, error);
    }
};
