const fs = require('fs');
const path = require('path');
const PersonalInfo = require('../models/personalInfo');
const { handleServerError } = require('../utils/serverErrorHandler');

exports.PostInfo = async (req, res) => {
    try {
        const { fullName, email, phone, address, birthDate, linkedIn } = req.body;

         // Find existing personal info to check for previous photo
         const existingInfo = await PersonalInfo.findOne();
         let previousPhotoPath = null;
 
         // If there's existing personal info, get the previous photo path
         if (existingInfo) {
             previousPhotoPath = existingInfo.photo;
         }

        let photoPath = null;

        // Check if a file was uploaded
        if (req.files && req.files.profileImage) {
            const file = req.files.profileImage;
            const uploadPath = path.join(__dirname, '../uploads/', file.name);

            // Move file to the server file system
            file.mv(uploadPath, (err) => {
                if (err) {
                    return handleServerError(res, err);
                }
            });

            // Save relative file path to the database
            photoPath = `/uploads/${file.name}`;
        }

         // If there's a previous photo, delete it
         if (previousPhotoPath) {
            const previousPhotoFullPath = path.join(__dirname, '../uploads/', path.basename(previousPhotoPath));
            fs.unlink(previousPhotoFullPath, (err) => {
                if (err) {
                    console.error('Failed to delete previous photo:', err);
                }
            });
        }

        // Create or update personal info in the database
        const personalInfo = await PersonalInfo.upsert({
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
        const personalInfo = await PersonalInfo.findOne();
        res.status(200).json(personalInfo);
    } catch (error) {
        handleServerError(res, error);
    }
};

exports.DeleteInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await PersonalInfo.destroy({
            where: { id }
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

