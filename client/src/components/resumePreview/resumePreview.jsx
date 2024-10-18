// src/components/ResumePreview.js
import React, {useState} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './resumePreview.css';
import ColorPicker from '../resumeEditor/resumeEditor';

function ResumePreview({ personalInfo, educations, experiences, skills, photo }) {
    const [accentColor, setAccentColor] = useState('#4CAF50'); // Default accent color
    const [textColor, setTextColor] = useState('#000000');

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
            
            // Create PDF with A4 size and maintain better aspect ratio
            const pdf = new jsPDF('portrait', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const imgWidth = pdfWidth * zoomFactor;
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

            // Add the image to the PDF
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, '', 'FAST');

            // Handle overflow if content exceeds one page
            let heightLeft = imgHeight - pdfHeight;
            let position = pdfHeight;

            while (heightLeft > 0) {
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight, '', 'FAST');
                heightLeft -= pdfHeight;
                position += pdfHeight;
            }

            pdf.save(`${personalInfo.fullName}_Resume.pdf`);
        });
    };
    
    return (
        <div className="resume-preview-container">
            <div id="resume-content" className="resume-preview">
                <div className="paper">
                    <div className="info-header" style={{ backgroundColor: accentColor }}>
                        <div className="profile-header">
                            {photo && (
                                <img
                                    src={`http://localhost:5000${personalInfo.photo}`}
                                    alt="Profile"
                                    crossOrigin="anonymous" // Ensure cross-origin access
                                    className="profile-photo"
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
                        {educations.map((edu, index) => (
                            <div key={index} className="entry" style={{ color: textColor }}>
                                <h4>{`${edu.fieldOfStudy} in ${edu.degree} at ${edu.school}`}</h4>
                                <p>{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}</p>
                                <p>{edu.description}</p>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h3 style={{ backgroundColor: accentColor }}>Work Experience</h3>
                        {experiences.map((exp, index) => (
                            <div key={index} className="entry" style={{ color: textColor }}>
                                <h4>{exp.company}</h4>
                                <p>{exp.position}</p>
                                <p>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}</p>
                                <p>{exp.responsibilities}</p>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h3 style={{ backgroundColor: accentColor }}>Skills</h3>
                        {skills.map((skl, index) => (
                            <li key={index} className="entry" style={{ color: textColor }}>
                                {skl.skillName}
                            </li>
                        ))}
                    </section>
                </div>
            </div>

            <div className='color-picker-section'>
                <ColorPicker
                    label="Accent Color"
                    color={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                />
                <ColorPicker
                    label="Text Color"
                    color={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                />
            </div>

            <button className="download-button" onClick={downloadPDF}>
                Download as PDF
            </button>
        </div>
    );
}

export default ResumePreview;
