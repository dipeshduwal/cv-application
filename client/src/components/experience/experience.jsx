import React, {useEffect, useState} from "react";
import { fetchExperiences, addExperience, updateExperience, deleteExperience } from "../../api/experienceApi";
import FormTemplate from "../formTemplate/formTemplate";
import ItemTemplate from "../formTemplate/itemTemplate";
import '../../styles/buttons.css';

function Experience({experiences,setExperiences, visibleExperiences, setVisibleExperiences}) {
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
        const laodExperiences = async () => {
            try {
                const data = await fetchExperiences();
                setExperiences(data);
                const initialVisibility = data.reduce((acc, exp) => {
                    acc[exp.id] = true;
                    return acc;
                }, {});
                setVisibleExperiences(initialVisibility);
            } catch (error) {
                console.error('Error fetching experiences:', error);
            }
        };
        laodExperiences();
    }, [setExperiences, setVisibleExperiences]);

    const handleSubmit = async (data) => {
        try {
            if (editingIndex !== null) {
                const updatedExperience = await updateExperience(experiences[editingIndex].id, data);
                const newExperiences = [...experiences];
                newExperiences[editingIndex] = updatedExperience;
                setExperiences(newExperiences);
                setEditingIndex(null);
            } else {
                const newExperience = await addExperience(data);
                setExperiences([...experiences, newExperience]);
            }
            resetForm();
        } catch (error) {
            console.error('Error submitting experience entry:', error);
        }
    };

    const handleEdit = (index) => {
        setExperience({...experiences[index],  experienceId: experiences[index].id});
        setEditingIndex(index);
        setShowForm(true);
    };

    const handleDelete = async (index) => {
        try {
            await deleteExperience(experiences[index].id);
            const newExperiences = experiences.filter((_, i) => i !== index);
            setExperiences(newExperiences);
        } catch (error) {
            console.error('Error deleting experience entry:', error);
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

    const toggleVisibility = (id) => {
        setVisibleExperiences((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    }

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
                        isVisible={visibleExperiences[exp.id]}
                        onToggleVisibility={() => toggleVisibility(exp.id)}
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

