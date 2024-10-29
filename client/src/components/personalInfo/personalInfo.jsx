import React, { useEffect, useState } from "react";
import { fetchPersonalInfos, savePersonalInfo, deletePersonalInfo } from "../../api/personalInfoApi";
import FormTemplate from "../formTemplate/formTemplate";
import Modal from "../modal/modal";

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        const loadPersonalInfos = async () => {
            try {
                const data = await fetchPersonalInfos(userEmail);
                setPersonalInfo(data || {});
            } catch (error) {
                console.error("Error fetching personal info:", error.response?.data || error.message);
            }
        };
        loadPersonalInfos();
    }, [userEmail, setPersonalInfo]);

    const handleSubmit = async (data) => {
        const personalInfoData = {
            fullName: data.fullName,
            personalEmail: data.personalEmail,
            phone: data.phone,
            address: data.address,
            birthDate: data.birthDate,
            linkedIn: data.linkedIn,
        };
    
        try {
            const updatedData = await savePersonalInfo({ ...personalInfoData, userEmail }, selectedPhoto);
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
            setPersonalInfo((prevInfo) => ({ ...prevInfo, photo: '' }));
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

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deletePersonalInfo(personalInfo.id);
            setIsModalOpen(false); 
            window.location.reload();
        } catch (error) {
            console.error("Error deleting personal info:", error);
            alert("Failed to delete personal information.");
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                photoError={photoError}>
                <button
                className="delete-button"
                onClick={handleDeleteClick}
                style={{ backgroundColor: 'red', color: 'white', padding: '10px', fontSize: '16px', cursor: 'pointer' }}
            >
                Delete Personal Data
            </button>
            <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                    title="Are you sure you want to delete?"
                />
            </FormTemplate>

        </div>
    );
}

export default PersonalInfo;
