import React, { useState, useEffect } from "react";
import FormTemplate from "../FormTemplate/FormTemplate";
import ItemTemplate from "../FormTemplate/ItemTemplate";
import '../../styles/Buttons.css';

function Education() {
    const [educations, setEducations] = useState([]);
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

    // Fetch all education entries on component mount
    useEffect(() => {
        const fetchEducations = async () => {
            const response = await fetch('/educations');
            const data = await response.json();
            setEducations(data);
        };
        fetchEducations();
    }, []);

    const handleSubmit = async (data) => {
        if (editingIndex !== null) {
            // Updating existing entry
            const response = await fetch(`/educations/${educations[editingIndex].id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const updatedEducation = await response.json();
            const newEducations = [...educations];
            newEducations[editingIndex] = updatedEducation; // Update the edited entry
            setEducations(newEducations);
            setEditingIndex(null);
        } else {
            // Adding new entry
            const response = await fetch('/educations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const newEducation = await response.json();
            setEducations([...educations, newEducation]); // Add new entry to the state
        }
        resetForm();
    };

    const handleEdit = (index) => {
        setEducation(educations[index]); // Load existing data into the form
        setEditingIndex(index); // Set the current index to edit
        setShowForm(true); // Show the form
    };

    const handleDelete = async (index) => {
        const response = await fetch(`/educations/${educations[index].id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const newEducations = educations.filter((_, i) => i !== index); // Remove the education at the given index
            setEducations(newEducations);
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

    // rendering the component
    return (
        <div className="education-section">
            <div className="education-list">
                {educations.map((edu, index) => (
                    <ItemTemplate
                        key={edu.id} // Use unique id from database
                        title={`${edu.degree} in ${edu.fieldOfStudy}`}
                        subtitle={`${edu.school} (${edu.startDate} - ${edu.endDate || 'Present'})`}
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
