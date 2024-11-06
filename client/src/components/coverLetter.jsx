import React, { useState } from 'react';
import axios from 'axios';

function CoverLetterGenerator({ resumeData, jobDetails }) {
    const [coverLetter, setCoverLetter] = useState('');
    const [message, setMessage] = useState('');

    const generateCoverLetter = async () => {
        setMessage('');
        
        try {
            const response = await axios.post('http://localhost:5000/cover-letter/generate', {
                resumeData,
                jobDetails,
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
            <button onClick={generateCoverLetter}>Generate Cover Letter</button>
            {message && <p>{message}</p>}
            {coverLetter && (
                <div className="cover-letter-output">
                    <h2>Generated Cover Letter</h2>
                    <p>{coverLetter}</p>
                </div>
            )}
        </div>
    );
}

export default CoverLetterGenerator;
