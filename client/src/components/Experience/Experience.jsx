import React, {useEffect, useState} from "react";
import FormTemplate from "../FormTemplate/FormTemplate";
import ItemTemplate from "../FormTemplate/ItemTemplate";
import '../../styles/Buttons.css';

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
        {name:'startDate', type:'date-month', label:'Date of Joining', placeholder:'Select Joining Date', required: true},
        {name:'endDate', type:'date-month', label:'Date of Ending', placeholder:'Select Ending Date'},
        {name:'responsibilities', type:'textarea', label:'Responsibilities', placeholder:'Describe your key responsibilities'}
    ];

    useEffect(() => {
        const fetchExperiences = async () => {
            try{
                const response = await fetch('http://localhost:5000/experiences');
                const data = await response.json();
                setExperiences(data);
            } catch (error){
                console.error("Error fetching experience entries:", error);
            }
        };
        fetchExperiences();
    }, []);

    const handleSubmit = async (data) => {
        try{
            if (editingIndex !== null){
                const response = await fetch(`http://localhost:5000/experiences/${experiences[editingIndex].id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
            });
            const updatedExperience = await response.json();
            const newExperiences = [...experiences];
            newExperiences[editingIndex] = updatedExperience; // Update the edited entry
            setExperiences(newExperiences);
            setEditingIndex(null);
        } else {
            // Adding new entry
            const response = await fetch('http://localhost:5000/experiences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const newExperience = await response.json();
            setExperiences([...experiences, newExperience]); // Add new entry to the state
        }
    } catch (error) {
        console.error("Error submitting experience entry:", error);
    }
        resetForm();
    };

    const handleEdit = (index) => {
        setExperience(experiences[index]);
        setEditingIndex(index);
        setShowForm(true);
    };

    const handleDelete = async (index) => {
        try{
            const response = await fetch(`http://localhost:5000/experiences/${experiences[index].id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const newExperiences = experiences.filter((_, i) => i !== index);
                setExperiences(newExperiences);
            }
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
        const [year, month] = dateString.split('-');
        return `${month}.${year}`;
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

