import React, { useState, useEffect } from "react";
import axios from 'axios';
import FormTemplate from "../formTemplate/formTemplate";
import ItemTemplate from "../formTemplate/itemTemplate";
import '../../styles/buttons.css';

function Education({ educations, setEducations }) {
    const [showForm, setShowForm] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [education, setEducation] = useState({
        school: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        description: ''
    });

    const fields = [
        { name: 'school', type: 'text', label: 'School', placeholder: 'Enter School Name', required: true },
        { name: 'degree', type: 'text', label: 'Degree', placeholder: 'Enter Degree Name', required: true },
        { name: 'fieldOfStudy', type: 'text', label: 'Field Of Study', placeholder: 'Enter field of study', required: true },
        { name: 'startDate', type: 'date', label: 'Start Date', placeholder: 'Select start date', required: true },
        { name: 'endDate', type: 'date', label: 'End Date', placeholder: 'Select end date' },
        { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Describe your education' }
    ];

    // Fetch all education entries on component mount using axios
    useEffect(() => {
        const fetchEducations = async () => {
            try {
                const token = localStorage.getItem('token');
                
                const response = await axios.get('http://localhost:5000/educations', {
                    headers: {
                        Authorization: `Bearer ${token}`  // Set the Authorization header
                    }
                });
                setEducations(response.data);
            } catch (error) {
                console.error("Error fetching education entries:", error);
            }
        };
        fetchEducations();
    }, [setEducations]);

    const handleSubmit = async (data) => {
        console.log("Submitting data:", data);
        try {
            const token = localStorage.getItem('token'); 
    
            if (editingIndex !== null) {
                console.log(`Updating education with ID: ${educations[editingIndex].id}`);
                // Ensure the educationId is part of the data object for the existing education
                data.educationId = educations[editingIndex].id;
    
                // Updating existing entry
                const response = await axios.put(`http://localhost:5000/educations/${educations[editingIndex].id}`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`   
                    },
                });
                const updatedEducation = response.data;
                const newEducations = [...educations];
                newEducations[editingIndex] = updatedEducation; // Update the edited entry in the state
                setEducations(newEducations);
                setEditingIndex(null);  // Reset the editing state
            } else {
                // Adding new entry
                const response = await axios.post('http://localhost:5000/educations', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`  // Set the Authorization header
                    },
                });
                const newEducation = response.data;
                setEducations([...educations, newEducation]); // Add new entry to the state
            }
        } catch (error) {
            console.error("Error submitting education entry:", error);
        }
        resetForm();  // Reset the form after submission
    };

    const handleEdit = (index) => {
        setEducation({ ...educations[index], educationId: educations[index].id }); // Load existing data into the form with educationId
        setEditingIndex(index); // Set the current index to edit
        setShowForm(true); // Show the form
    };
    
    const handleDelete = async (index) => {
        try {
            const token = localStorage.getItem('token'); // Get the token

            await axios.delete(`http://localhost:5000/educations/${educations[index].id}`, {
                headers: {
                    Authorization: `Bearer ${token}`  // Set the Authorization header
                }
            });
            const newEducations = educations.filter((_, i) => i !== index); // Remove the education at the given index
            setEducations(newEducations);
        } catch (error) {
            console.error("Error deleting education entry:", error);
        }
    };

    const resetForm = () => {
        setEducation({
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            description: ''
        });
        setShowForm(false);
        setEditingIndex(null);
    };

    const handleCancel = () => {
        resetForm();
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month] = dateString.split('-');
        return `${month}.${year}`;
    };

    // Rendering the component
    return (
        <div className="education-section">
            <div className="education-list">
                {educations.map((edu, index) => (
                    <ItemTemplate
                        key={edu.id} // Use unique id from database
                        title={`${edu.fieldOfStudy} in ${edu.degree}`}
                        subtitle={`${edu.school} (${formatDate(edu.startDate)} - ${formatDate(edu.endDate) || 'Present'})`}
                        description={edu.description}
                        onEdit={() => handleEdit(index)}
                        onDelete={() => handleDelete(index)}
                    />
                ))}
            </div>
            {showForm ? (
                <div className="form-container">
                    <FormTemplate
                        title={editingIndex !== null ? "Edit Education" : "Add Education"}
                        fields={fields}
                        data={education}
                        setData={setEducation}
                        onSubmit={handleSubmit}
                    />
                    <button className="cancel-button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            ) : (
                <button className="new-entry-button" onClick={() => setShowForm(true)}>
                    New Entry
                </button>
            )}
        </div>
    );
}

export default Education;
