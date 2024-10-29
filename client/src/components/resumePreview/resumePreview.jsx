import React, {useState, useEffect} from 'react';
import ResumeEditor from '../resumeEditor/resumeEditor';
import './resumePreview.css';

function ResumePreview({ personalInfo, educations = [], visibleEducations, experiences = [], visibleExperiences, skills =[], visibleSkills, photo, }) {
    const [accentColor, setAccentColor] = useState('#125413');
    const [textColor, setTextColor] = useState('#143d15');
    const [fontFamily, setFontFamily] = useState('Merriweather');
    const [message, setMessage] = useState('');
    const [isVertical, setIsVertical] = useState(false);
    
    const filteredEducations = educations.filter(edu => visibleEducations[edu.id]);
    const filteredExperiences = experiences.filter(exp => visibleExperiences[exp.id]);
    const filteredSkills = skills.filter(skl => visibleSkills[skl.id]);

    useEffect(() => {
        const storedAccentColor = localStorage.getItem('accentColor');
        const storedTextColor = localStorage.getItem('textColor');
        const storedFont = localStorage.getItem('font');

        if (storedAccentColor) setAccentColor(storedAccentColor);
        if (storedTextColor) setTextColor(storedTextColor);
        if (storedFont) setFontFamily(storedFont);
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), 3000);
    };
    
    return (
        <div className="resume-preview-container">
            <div 
            id="resume-content" 
            className={`resume-preview ${isVertical ? 'vertical' : ''}`}
            style={{ fontFamily }}>
                <div className="paper">
                    <div className={`info-header ${isVertical ? 'vertical' : 'horizontal'}`} style={{ backgroundColor: accentColor }}>
                    {personalInfo.photo ? (
                            <div className="profile-header">
                                <img
                                    src={`http://localhost:5000${personalInfo.photo}?t=${new Date().getTime()}`}
                                    alt="Profile"
                                    crossOrigin="anonymous"
                                    className="profile-photo"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '';
                                    }}
                                />
                                <h2 className="heading-name">{personalInfo.fullName}</h2>
                            </div>
                        ) : (
                        <div className="heading-name-optional">{personalInfo.fullName}</div>
                    )}
                        <div className="personal-info" style={{ color: textColor }}>
                            <p>
                                {personalInfo.personalEmail && `E-mail: ${personalInfo.personalEmail}`} <br />
                                {personalInfo.phone && `Contact: ${personalInfo.phone}`} <br />
                                {personalInfo.address && `Address: ${personalInfo.address}`} <br />
                                {personalInfo.birthDate &&
                                    `Date of Birth: ${new Date(personalInfo.birthDate).toLocaleDateString()}`} <br />
                                {personalInfo.linkedIn && `LinkedIn Profile: ${personalInfo.linkedIn}`}
                            </p>
                        </div>
                    </div>

                    <section>
                        <h3 style={{ backgroundColor: accentColor }}>Education</h3>
                        {filteredEducations.map((edu) => (
                            <div key={edu.id} className="entry" style={{ color: textColor }}>
                                <h4>{`${edu.fieldOfStudy} in ${edu.degree} at ${edu.school}`}</h4>
                                <p>{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}</p>
                                <p>{edu.description}</p>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h3 style={{ backgroundColor: accentColor }}>Work Experience</h3>
                        {filteredExperiences.map((exp) => (
                            <div key={exp.id} className="entry" style={{ color: textColor }}>
                                <h4>{exp.company}</h4>
                                <p>{exp.position}</p>
                                <p>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}</p>
                                <p>{exp.responsibilities}</p>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h3 style={{ backgroundColor: accentColor }}>Skills</h3>
                        {filteredSkills.map((skl) => (
                            <li key={skl.id} className="entry" style={{ color: textColor }}>
                                {skl.skillName}
                            </li>
                        ))}
                    </section>
                </div>
            </div>
            <button className='toggle-button' onClick={() => setIsVertical(!isVertical)}>
                Change Template Design
            </button>

            <ResumeEditor
                accentColor={accentColor}
                setAccentColor={setAccentColor}
                textColor={textColor}
                setTextColor={setTextColor}
                fontFamily={fontFamily}
                setFontFamily={setFontFamily}
                personalInfo={personalInfo}
                showMessage={showMessage}
            />
        
            {message && <div className="message-notify">{message}</div>}
            
            
        </div>
    );
}

export default ResumePreview;
