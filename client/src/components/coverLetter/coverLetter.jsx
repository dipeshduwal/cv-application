import React, { useState } from 'react';
import axios from 'axios';
import './coverLetter.css';

function CoverLetterGenerator({ resumeData }) {
    const [jobTitle, setJobTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [message, setMessage] = useState('');

    const generateCoverLetter = async () => {
        if (!jobTitle || !companyName) {
            setMessage('Please enter both job title and company name.');
            return;
        }

        const jobDetails = {
            jobTitle,
            companyName,
        };

        try {
            const response = await axios.post('http://localhost:5000/coverletter', {
                resumeData: JSON.stringify(resumeData),
                jobDetails: JSON.stringify(jobDetails),
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setCoverLetter(response.data.coverLetter);
            setMessage('Cover letter generated successfully!');
        } catch (error) {
            console.error('Error generating cover letter:', error);
            setMessage('Failed to generate cover letter.');
        }
    };

    return (
        <div className="cover-letter-generator">
            <input
                type="text"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
            />
            <button onClick={generateCoverLetter}>Generate Cover Letter</button>
            {message && <p className="message">{message}</p>}
            {coverLetter && (
                <div className="cover-letter-output">
                    <h3>Generated Cover Letter</h3>
                    <p>{coverLetter}</p>
                </div>
            )}
        </div>
    );
}

export default CoverLetterGenerator;
