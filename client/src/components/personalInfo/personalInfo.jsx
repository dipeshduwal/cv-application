import React, { useEffect } from "react";
import FormTemplate from "../formTemplate/formTemplate";

function PersonalInfo({ personalInfo, setPersonalInfo }) {
    const fields = [
        { name: 'fullName', type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true },
        { name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email address', required: true },
        { name: 'phone', type: 'tel', label: 'Phone Number', placeholder: 'Enter your phone number', required: true },
        { name: 'address', type: 'text', label: 'Address', placeholder: 'Enter your Address', required: true },
        { name: 'birthDate', type: 'date', label: 'Date of Birth', placeholder: 'Select your date of birth', required: true },
        { name: 'linkedIn', type: 'url', label: 'LinkedIn Profile', placeholder: 'Enter your LinkedIn profile URL' },
        { name: 'photo', type: 'file', label: 'Upload Photo', accept: 'image/*' }
    ];

    // Fetch personal info on mount
    const fetchPersonalInfo = async () => {
        try {
            const response = await fetch('http://localhost:5000/infos');
            const data = await response.json();
            setPersonalInfo(data);
        } catch (error) {
            console.error("Error fetching personal info:", error);
        }
    };

    useEffect(() => {
        fetchPersonalInfo();
    }, [setPersonalInfo]);

    // Handle date formatting
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear().toString().slice(-2); // Last two digits of year
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (data) => {
        // Format the birthDate to 'yy-mm-dd'
        if (data.birthDate) {
            data.birthDate = formatDate(data.birthDate);
        }

        try {
            const response = await fetch('http://localhost:5000/infos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const updatedPersonalInfo = await response.json();
            setPersonalInfo(updatedPersonalInfo);

            // Re-fetch the updated data after successful submission
            await fetchPersonalInfo();  // Ensure the data is refreshed after submitting
        } catch (error) {
            console.error("Error submitting personal info:", error);
        }
    };

    // Handle photo change
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPersonalInfo((prev) => ({ ...prev, photo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
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
            />
        </div>
    );
}

export default PersonalInfo;
