// src/components/ResumePreview.js
import React, {useState} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './resumePreview.css';

function ResumePreview({ personalInfo, educations = [], visibleEducations, experiences = [], visibleExperiences, skills =[], visibleSkills, photo, }) {
    const [accentColor, setAccentColor] = useState('#125413'); // Default accent color
    const [textColor, setTextColor] = useState('#143d15');
    const [fontFamily, setFontFamily] = useState('Merriweather');
    
    const filteredEducations = educations.filter(edu => visibleEducations[edu.id]);
    const filteredExperiences = experiences.filter(exp => visibleExperiences[exp.id]);
    const filteredSkills = skills.filter(skl => visibleSkills[skl.id]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const downloadPDF = () => {
        const resume = document.getElementById('resume-content');

        // Use high scale factor for better resolution
        const scale = 3; // Adjust scale factor to 2x or 3x for higher quality
        const zoomFactor = 1.1;

        html2canvas(resume, {
            scale: scale, // Increases canvas resolution
            useCORS: true, // Enable CORS for cross-origin images
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png', 1.0); // Set quality to 100%

            // Fixed PDF width (A4 size width)
            const pdf = new jsPDF('portrait', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth(); // A4 width in mm

            // Dynamically calculate height based on image aspect ratio
            const imgWidth = pdfWidth * zoomFactor; // Keep width same as PDF
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

            // Create PDF with calculated dynamic height
            const pdfHeight = imgHeight; // Set PDF height to image height

            // Change PDF page size dynamically
            pdf.internal.pageSize.setHeight(pdfHeight);

            // Add the image to the PDF
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, '', 'FAST');

            pdf.save(`${personalInfo.fullName}_Resume.pdf`);
        });
    };
    
    return (
        <div className="resume-preview-container">
            <div 
            id="resume-content" 
            className="resume-preview" 
            style={{ fontFamily }}>
                <div className="paper">
                    <div className="info-header" style={{ backgroundColor: accentColor }}>
                        <div className="profile-header">
                            {photo && (
                                <img
                                    src={`http://localhost:5000${personalInfo.photo}`}
                                    alt="Profile"
                                    crossOrigin="anonymous" // Ensure cross-origin access
                                    className="profile-photo"
                                    onError={(e) => {
                                        e.target.onerror = null; // Prevent looping
                                    }}
                                />
                            )}
                            <h2 className="heading-name">{personalInfo.fullName}</h2>
                        </div>
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

            <div className='resume-editor'>
            <div className="color-picker-section">
                <h5>Colors</h5>
                <div className="option-accent">
                    <label>Accent Color:</label>
                    <div className="color-picker-wrapper">
                        <div
                            className="color-accent"
                            onClick={() => document.getElementById('accent-color-picker').click()}
                        >
                            <div className="color-box" style={{ backgroundColor: accentColor }} />
                            <span className="color-code">{accentColor}</span>
                        </div>
                        <input
                            id="accent-color-picker"
                            type="color"
                            value={accentColor}
                            onChange={(e) => setAccentColor(e.target.value)}
                        />
                    </div>
                </div>

                <div className="option-text">
                    <label>Text Color:</label>
                    <div className="color-picker-wrapper">
                        <div
                            className="color-text"
                            onClick={() => document.getElementById('text-color-picker').click()}
                        >
                            <div className="color-box" style={{ backgroundColor: textColor }} />
                            <span className="color-code">{textColor}</span>
                        </div>
                        <input
                            id="text-color-picker"
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="font-picker-section">
                <h5>Fonts</h5>
                <div className='font-buttons'>
                    <button
                    className='font-button'
                    style={{fontFamily: "'Roboto', sans-serif"}}
                    onClick={() => setFontFamily("'Roboto', sans-serif")}>
                        Roboto<br/>
                        <span className='font-sample'>Aa</span>
                    </button>

                    <button
                    className='font-button'
                    style={{fontFamily: "'Merriweather', sans-serif"}}
                    onClick={() => setFontFamily("'Merriweather', sans-serif")}>
                        Merriweather<br/>
                        <span className='font-sample'>Aa</span>
                    </button>

                    <button
                    className='font-button'
                    style={{fontFamily: "'Tahoma', sans-serif"}}
                    onClick={() => setFontFamily("'Tahoma', sans-serif")}>
                        Tahoma<br/>
                        <span className='font-sample'>Aa</span>
                    </button>
                </div>
            </div>
            </div>
            
            <div className='resume-buttons'>
            <button
                className="reset-button"
                onClick={() => {
                    setFontFamily("'Merriweather', sans-serif");
                    setAccentColor('#125413');
                    setTextColor('#143d15');
                }}>
                Reset to Default
            </button>

            <button className="download-button" onClick={downloadPDF}>
                Download as PDF
            </button>
            </div>
        </div>
    );
}

export default ResumePreview;
