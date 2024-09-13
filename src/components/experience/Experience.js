import React, {useState} from "react";

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

    const handleSubmit = (data) => {
        if (editingIndex !== null){
            const newExperiences = [...experiences];
            newExperiences[editingIndex] = data;
            setExperiences(newExperiences);
            setEditingIndex(null);
        } else{
            setExperiences([...experiences, data]);
        }
        resetForm();
    };

    const handleEdit = (index) => {
        setExperience(experiences[index]);
        setEditingIndex(index);
        setShowForm(true);
    };

    const fields = [
        {name:'company', type:'text', label:'Company Name', placeholder:'Enter Company Name', required: true},
        {name:'position', type:'text', label:'Position Name', placeholder:'Enter Job Title', required: true},
        {name:'startDate', type:'date-month', label:'Date of Joining', placeholder:'Select Joining Date', required: true},
        {name:'endDate', type:'date-month', label:'Date of Ending', placeholder:'Select Ending Date'},
        {name:'responsibilities', type:'textarea', label:'Responsibilities', placeholder:'Describe your key responsibilities'}
    ];

    return(
        <div className="experience-section">
            <div className="experience-list">
                {experiences.map((exp, index) => (
                    <ItemTemplate
                        key={index}
                        title={`${exp.position} at ${exp.company}`}
                        subtitle={`${exp.startDate} - ${exp.endDate || 'Present'}`}
                        description={exp.responsibilities}
                    />
                ))}

            </div>

        </div>

    )

}

export default Experience;

