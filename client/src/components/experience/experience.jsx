import React, {useEffect, useState} from "react";
import axios from 'axios';
import FormTemplate from "../formTemplate/formTemplate";
import ItemTemplate from "../formTemplate/itemTemplate";
import '../../styles/buttons.css';

function Experience({experiences,setExperiences}) {
    const [showForm, setShowForm] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [experience, setExperience] = useState({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        responsibilities: ''
    });

    const fields = [
        {name:'company', type:'text', label:'Company Name', placeholder:'Enter Company Name', required: true},
        {name:'position', type:'text', label:'Position Name', placeholder:'Enter Job Title', required: true},
        {name:'startDate', type:'date', label:'Date of Joining', placeholder:'Select Joining Date', required: true},
        {name:'endDate', type:'date', label:'Date of Ending', placeholder:'Select Ending Date'},
        {name:'responsibilities', type:'textarea', label:'Responsibilities', placeholder:'Describe your key responsibilities'}
    ];

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const token = localStorage.getItem('token');
                
                const response = await axios.get(`http://localhost:5000/experiences`, {
                    headers: {
                        Authorization: `Bearer ${token}`  // Set the Authorization header
                    }
                });
                setExperiences(response.data);
            } catch (error) {
                console.error("Error fetching experience entries:", error);
            }
        };
        fetchExperiences();
    }, [setExperiences]);

    const handleSubmit = async (data) => {
        
        try {
            const token = localStorage.getItem('token'); 
    
            if (editingIndex !== null) {
            
                data.experienceId = experiences[editingIndex].id;
    
                // Updating existing entry
                const response = await axios.put(`http://localhost:5000/experiences/${experiences[editingIndex].id}`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`   
                    },
                });
                const updatedExperience = response.data;
                const newExperiences = [...experiences];
                newExperiences[editingIndex] = updatedExperience; // Update the edited entry in the state
                setExperiences(newExperiences);
                setEditingIndex(null);  // Reset the editing state
            } else {
                // Adding new entry
                const response = await axios.post(`http://localhost:5000/experiences`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`  // Set the Authorization header
                    },
                });
                const newExperience = response.data;
                setExperiences([...experiences, newExperience]); // Add new entry to the state
            }
        } catch (error) {
            console.error("Error submitting experience entry:", error);
        }
        resetForm();  // Reset the form after submission
    };

    const handleEdit = (index) => {
        setExperience({...experiences[index],  experienceId: experiences[index].id});
        setEditingIndex(index);
        setShowForm(true);
    };

    const handleDelete = async (index) => {
        try {
            const token = localStorage.getItem('token'); // Get the token

            await axios.delete(`http://localhost:5000/experiences/${experiences[index].id}`, {
                headers: {
                    Authorization: `Bearer ${token}`  // Set the Authorization header
                }
            });
            const newExperiences = experiences.filter((_, i) => i !== index);
            setExperiences(newExperiences);
        } catch (error) {
            console.error("Error deleting experience entry:", error);
        }
    };

    const resetForm = () => {
        setExperience({
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            responsibilities: ''
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

    return(
        <div className="experience-section">
            <div className="experience-list">
                {experiences.map((exp, index) => (
                    <ItemTemplate
                        key={exp.id}
                        title={`${exp.position} at ${exp.company}`}
                        subtitle={`${formatDate(exp.startDate)} - ${formatDate(exp.endDate) || 'Present'}`}
                        description={exp.responsibilities}
                        onEdit={() => handleEdit(index)}
                        onDelete={() => handleDelete(index)}
                    />
                ))}

            </div>
            {showForm ? (
                <div className="form-container">
                    <FormTemplate
                        title={editingIndex !== null ? "Edit Work Experience" : "Add Work Experience"}
                        fields={fields}
                        data={experience}
                        setData={setExperience}
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

export default Experience;

