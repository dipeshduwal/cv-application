import React, {useState, useEffect} from "react";
import axios from 'axios';
import FormTemplate from "../formTemplate/formTemplate";
import ItemTemplate from "../formTemplate/itemTemplate";
import '../../styles/buttons.css'

function Skill({skills, setSkills, visibleSkills, setVisibleSkills}){
    const [showForm, setShowForm] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [skill, setSkill] = useState({
        skillName: ''
    });

    const fields = [
        {name:'skillName', type:'text', label:'Skill', placeholder:'Enter Skill', required: true}
    ];

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const token = localStorage.getItem('token');
                
                const response = await axios.get(`http://localhost:5000/skills`, {
                    headers: {
                        Authorization: `Bearer ${token}`  // Set the Authorization header
                    }
                });
                setSkills(response.data);
                const initialVisibility = response.data.reduce((acc, skl) => {
                    acc[skl.id] = true;
                    return acc;
                }, {});
                setVisibleSkills(initialVisibility);
            } catch (error) {
                console.error("Error fetching skill entries:", error);
            }
        };
        fetchSkills();
    }, [setSkills]);

    const handleSubmit = async (data) => {
        
        try {
            const token = localStorage.getItem('token'); 
    
            if (editingIndex !== null) {
            
                data.skillId = skills[editingIndex].id;
    
                // Updating existing entry
                const response = await axios.put(`http://localhost:5000/skills/${skills[editingIndex].id}`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`   
                    },
                });
                const updatedSkill = response.data;
                const newSkills = [...skills];
                newSkills[editingIndex] = updatedSkill; // Update the edited entry in the state
                setSkills(newSkills);
                setEditingIndex(null);  // Reset the editing state
            } else {
                // Adding new entry
                const response = await axios.post(`http://localhost:5000/skills`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`  // Set the Authorization header
                    },
                });
                const newSkill = response.data;
                setSkills([...skills, newSkill]); // Add new entry to the state
            }
        } catch (error) {
            console.error("Error submitting skill entry:", error);
        }
        resetForm();  // Reset the form after submission
    };

    const handleEdit = (index) => {
        setSkill({...skills[index], skillId: skills[index].id});
        setEditingIndex(index);
        setShowForm(true);
    }

    const handleDelete = async (index) => {
        try {
            const token = localStorage.getItem('token'); // Get the token

            await axios.delete(`http://localhost:5000/skills/${skills[index].id}`, {
                headers: {
                    Authorization: `Bearer ${token}`  // Set the Authorization header
                }
            });
            const newSkills = skills.filter((_, i) => i !== index);
            setSkills(newSkills);
        } catch (error) {
            console.error("Error deleting skill entry:", error);
        }
    };

    const resetForm = () => {
        setSkill({
            skillName: ''
        });
        setShowForm(false);
        setEditingIndex(null);
    };

    const handleCancel = () => {
        resetForm();
    };

    const toggleVisibility = (id) => {
        setVisibleSkills((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle visibility state
        }));
    };

    return (
        <div className="skill-section">
            <div className="skill-list">
                {skills.map((skl, index) => (
                    <ItemTemplate 
                        key={skl.id}
                        title={skl.skillName}
                        onEdit={() => handleEdit(index)}
                        onDelete={() => handleDelete(index)}
                        isVisible={visibleSkills[skl.id]}
                        onToggleVisibility={() => toggleVisibility(skl.id)}
                    />
                
                ))}
            </div>
            {showForm ? (
                <div>
                    <FormTemplate
                        title={editingIndex !== null ? "Edit Skill" : "Add Skill"}
                        fields={fields}
                        data={skill}
                        setData={setSkill}
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

export default Skill;