import React from 'react';
import './resumePreview.css';

// To display a formatted resume based on the personal information, education, work experience, and skills passed as props
function ResumePreview({ personalInfo, educations, experiences, skills, photo }) {

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="resume-preview">
            <div className="paper">
                <div className='info-header'>
                    <div className='profile-header'>
                        {/* Display photo from the database */}
                        {personalInfo.photo && (
                            <img 
                                src={`http://localhost:5000${personalInfo.photo}`} 
                                alt="Profile" 
                                className="profile-photo" 
                            />
                        )}
                        <h2 className='heading-name'>{personalInfo.fullName}</h2>
                    </div>
                    <div className='personal-info'>
                        <p>
                            {personalInfo.personalEmail && `E-Mail: ${personalInfo.personalEmail}`} <br />
                            {personalInfo.phone && `Contact: ${personalInfo.phone}`} <br />
                            {personalInfo.address && `Address: ${personalInfo.address}`} <br />
                            {personalInfo.birthDate && `Date of Birth: ${new Date(personalInfo.birthDate).toLocaleDateString()}`} <br />
                            {personalInfo.linkedIn && `LinkedIn Profile: ${personalInfo.linkedIn}`}
                        </p>
                    </div>
                </div>

                <section>
                    <h3>Education</h3>
                    {educations.map((edu, index) => (
                        <div key={index} className="entry">
                            <h4>{`${edu.fieldOfStudy} in ${edu.degree} at ${edu.school}`}</h4>
                            <p>{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}</p>
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
                            <p>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}</p>
                            <p>{exp.responsibilities}</p>
                        </div>
                    ))}
                </section>

                <section>
                    <h3>Skills</h3>
                    {skills.map((skl, index) => (
                        <li key={index} className="entry">
                            {skl.skillName}
                        </li>
                    ))}
                </section>
            </div>
        </div>
    );
}

export default ResumePreview;
