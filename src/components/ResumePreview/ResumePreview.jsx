import React from 'react';
import './ResumePreview.css';

function ResumePreview({ personalInfo, educations, experiences, skills }) {

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month] = dateString.split('-');
        return `${month}.${year}`;
    };

    return (
        <div className="resume-preview">
            <div className="paper">
                <div className='info-header'>
                    <h2>{personalInfo.fullName}</h2>
                    <p>
                        {personalInfo.email && `E-Mail: ${personalInfo.email}`} <br/>
                        {personalInfo.phone && `Contact: ${personalInfo.phone}`} <br/>
                    </p>
                    <p>
                        {personalInfo.address && `Address: ${personalInfo.address}`} <br/>
                        {personalInfo.birthDate && `Date of Birth: ${personalInfo.birthDate}`} <br/>
                        {personalInfo.linkedIn && `LinkedIn Profile: ${personalInfo.linkedIn}`}
                    </p>
                </div>

                <section>
                    <h3>Education</h3>
                    {educations.map((edu, index) => (
                        <div key={index} className="entry">
                            <p>{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}</p>
                            <h4>{`${edu.degree} in ${edu.fieldOfStudy} at ${edu.school}`}</h4>
                            <p>{edu.description}</p>
                        </div>
                    ))}
                </section>

                <section>
                    <h3>Work Experience</h3>
                    {experiences.map((exp, index) => (
                        <div key={index} className="entry">
                            <h4>{exp.company}</h4>
                            <p>{exp.position}</p>
                            <p>{exp.startDate} - {exp.endDate}</p>
                        </div>
                    ))}
                </section>

                <section>
                    <h3>Skills</h3>
                    {skills.map((skl, index) => (
                        <div key={index} className="entry">
                            <h4>{skl.skillName}</h4>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}

export default ResumePreview;