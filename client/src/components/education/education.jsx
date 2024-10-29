import React, { useState, useEffect } from "react";
import { fetchEducations,addEducation,updateEducation,deleteEducation} from '../../api/educationApi';
import FormTemplate from "../formTemplate/formTemplate";
import ItemTemplate from "../formTemplate/itemTemplate";
import '../../styles/buttons.css';

function Education({ educations, setEducations, visibleEducations, setVisibleEducations }) {
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

    useEffect(() => {
        const loadEducations = async () => {
            try {
                const data = await fetchEducations();
                setEducations(data);
                const initialVisibility = data.reduce((acc, edu) => {
                    acc[edu.id] = true;
                    return acc;
                }, {});
                setVisibleEducations(initialVisibility);
            } catch (error) {
                console.error('Error fetching educations:', error);
            }
        };
        loadEducations();
    }, [setEducations, setVisibleEducations]);

    const handleSubmit = async (data) => {
        try {
            if (editingIndex !== null) {
                const updatedEducation = await updateEducation(educations[editingIndex].id, data);
                const newEducations = [...educations];
                newEducations[editingIndex] = updatedEducation;
                setEducations(newEducations);
                setEditingIndex(null);
            } else {
                const newEducation = await addEducation(data);
                setEducations([...educations, newEducation]);
            }
            resetForm();
        } catch (error) {
            console.error('Error submitting education entry:', error);
        }
    };

    const handleEdit = (index) => {
        setEducation({ ...educations[index], educationId: educations[index].id }); // Load existing data into the form with educationId
        setEditingIndex(index); 
        setShowForm(true);
    };
    
    const handleDelete = async (index) => {
        try {
            await deleteEducation(educations[index].id);
            const newEducations = educations.filter((_, i) => i !== index);
            setEducations(newEducations);
        } catch (error) {
            console.error('Error deleting education entry:', error);
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
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const toggleVisibility = (id) => {
        setVisibleEducations((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="education-section">
            <div className="education-list">
                {educations.map((edu, index) => (
                    <ItemTemplate
                        key={edu.id} 
                        title={`${edu.fieldOfStudy} in ${edu.degree}`}
                        subtitle={`${edu.school} (${formatDate(edu.startDate)} - ${formatDate(edu.endDate) || 'Present'})`}
                        description={edu.description}
                        onEdit={() => handleEdit(index)}
                        onDelete={() => handleDelete(index)}
                        isVisible={visibleEducations[edu.id]}
                        onToggleVisibility={() => toggleVisibility(edu.id)}
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
