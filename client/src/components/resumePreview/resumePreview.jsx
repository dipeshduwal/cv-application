import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './resumePreview.css';

// To display a formatted resume based on the personal information, education, work experience, and skills passed as props
function ResumePreview({ personalInfo, educations, experiences, skills, photo }) {

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const downloadPDF = () => {
        const resume = document.getElementById('resume-content');
        html2canvas(resume).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('portrait', 'pt', 'a4');
            const imgWidth = 550; //Fit to A4 width
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            // Add pages if the content is long
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${personalInfo.fullName}_Resume.pdf`);
        });
    };

    return (
        <div className="resume-preview">
            <button className="download-button" onClick={downloadPDF}>
                Download as PDF
            </button>

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
