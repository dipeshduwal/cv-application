import FormTemplate from "../FormTemplate/FormTemplate";

function PersonalInfo({personalInfo,setPersonalInfo}){
    const fields= [
        {name: 'fullName', type:'text', label: 'Full Name', placeholder: 'Enter your full name', required: true},
        {name: 'email', type:'email', label: 'Email', placeholder: 'Enter your email address', required: true},
        {name: 'phone', type:'tel', label: 'Phone Number', placeholder: 'Enter your phone number', required: true},
        {name: 'address', type:'text', label: 'Address', placeholder: 'Enter your Address', required: true},
        {name: 'birthDate', type:'date', label: 'Date of Birth', placeholder: 'Select your date of birth', required: true},
        {name: 'linkedIn', type:'url', label: 'LinkedIn Profile', placeholder: 'Enter your LinkedIn profile URL'},
        { name: 'photo', type: 'file', label: 'Upload Photo', accept: 'image/*' }
    ];

    const handleSubmit = (data) => {
        setPersonalInfo(data);
    };
    
    // Handle photo change
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Set the base64 encoded image to the personalInfo
                setPersonalInfo((prev) => ({ ...prev, photo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="personal-info">
            <FormTemplate
            //passing hardcoded data from common parent
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