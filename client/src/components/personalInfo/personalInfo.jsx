import React, { useEffect, useState } from "react";
import { fetchPersonalInfos, savePersonalInfo } from "../../api/personalInfoApi";
import FormTemplate from "../formTemplate/formTemplate";

function PersonalInfo({ personalInfo, setPersonalInfo }) {
    const fields = [
        { name: 'fullName', type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true },
        { name: 'personalEmail', type: 'email', label: 'Email', placeholder: 'Enter your email address', required: true },
        { name: 'phone', type: 'tel', label: 'Phone Number', placeholder: 'Enter your phone number', required: true },
        { name: 'address', type: 'text', label: 'Address', placeholder: 'Enter your address', required: true },
        { name: 'birthDate', type: 'date', label: 'Date of Birth', placeholder: 'Select your date of birth', required: true },
        { name: 'linkedIn', type: 'url', label: 'LinkedIn Profile', placeholder: 'Enter your LinkedIn profile URL' },
        { name: 'photo', type: 'file', label: 'Upload Photo', accept: 'image/*' }
    ];

    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [photoError, setPhotoError] = useState(''); 

    useEffect(() => {
        const loadPersonalInfos = async () => {
            try {
                const data = await fetchPersonalInfos();
                setPersonalInfo(data);
            } catch (error) {
                console.error("Error fetching personal info:", error.response?.data || error.message);
            }
        };
        loadPersonalInfos();
    }, [setPersonalInfo]);

    const handleSubmit = async (data) => {
        try {
            const updatedData = await savePersonalInfo(data, selectedPhoto);
            setPersonalInfo(updatedData);
            setSelectedPhoto(null);
            setPhotoError('');
        } catch (error) {
            console.error("Error submitting personal info:", error);
        }
    };
    
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
    
        if (!file) {
            setPersonalInfo((prevInfo) => ({ ...prevInfo, photo: null }));
            setSelectedPhoto(null);
            setPhotoError('');  
            return;
        }
    
        const MAX_SIZE = 2 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            setPhotoError("File size exceeds 2MB.");
            return;
        }
    
        const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
        if (!ALLOWED_TYPES.includes(file.type)) {
            setPhotoError("Only JPEG and PNG files are allowed.");
            return;
        }
    
        setSelectedPhoto(file);
        setPhotoError('');
    };

    return (
        <div className="personal-info">
            <FormTemplate
                title="Personal Information"
                fields={fields}
                data={personalInfo}
                setData={setPersonalInfo}
                onSubmit={handleSubmit}
                handlePhotoChange={handlePhotoChange}
                photoError={photoError}
            />
        
        </div>
    );
}

export default PersonalInfo;
