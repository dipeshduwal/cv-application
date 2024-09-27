import React, {useState} from "react";
import FormTemplate from "../FormTemplate/FormTemplate";
import ItemTemplate from "../FormTemplate/ItemTemplate";
import '../../styles/Buttons.css'

function Skill({skills, setSkills}){
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
                const response = await fetch('http://localhost:5000/skills');
                const data = await response.json();
                setSkills(data);
            } catch (error) {
                console.error("Error fetching skill entries:", error);
            }
        };
        fetchSkills();
    }, []);

    const handleSubmit = async (data) => {
        try {
            if (editingIndex !== null) {
                const response = await fetch(`http://localhost:5000/skills/${skills[editingIndex].id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const updatedSkill = await response.json();
                const newSkills = [...skills];
                newSkills[editingIndex] = updatedSkill; // Update the edited entry
                setSkills(newSkills);
                setEditingIndex(null);
            } else {
                
                const response = await fetch('http://localhost:5000/skills', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const newSkill = await response.json();
                setSkills([...skills, newSkill]); // Add new entry to the state
            }
        } catch (error) {
            console.error("Error submitting skill entry:", error);
        }
        resetForm();
    };

    const handleEdit = (index) => {
        setSkill(skills[index]);
        setEditingIndex(index);
        setShowForm(true);
    }

    const handleDelete = async (index) => {
        try {
            const response = await fetch(`http://localhost:5000/skills/${skills[index].id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const newSkills = skills.filter((_, i) => i !== index);
                setSkills(newSkills);
            }
        } catch (error) {
            console.error("Error deleting skill entry:", error);
        }
    };

    const resetForm = () => {
        setSkill({
            skillName: '',
        });
        setShowForm(false);
        setEditingIndex(null);
    };

    const handleCancel = () => {
        resetForm();
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