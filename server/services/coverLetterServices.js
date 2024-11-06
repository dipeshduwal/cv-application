const axios = require('axios');

const generateCoverLetter = async (resumeData, jobDetails) => {
    const prompt = `
        Write a professional cover letter for the position of ${jobDetails.jobTitle} at ${jobDetails.companyName}.
        Personalize it based on the following resume details and job description:
        
        Resume:
        Name: ${resumeData.personalInfo.fullName}
        Summary: ${resumeData.personalInfo.personalEmail}
        Work Experience: ${resumeData.experiences.map(exp => `${exp.position} at ${exp.company}`).join(', ')}
        Skills: ${resumeData.skills.map(skill => skill.skillName).join(', ')}
        Education: ${resumeData.educations.map(edu => `${edu.degree} in ${edu.fieldOfStudy} at ${edu.school}`).join(', ')}
        
        Job Description:
        ${jobDetails.jobDescription || "No job description provided"}
    `;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-4',
            prompt: prompt,
            max_tokens: 300,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].text;
    } catch (error) {
        console.error('Error generating cover letter:', error);
        throw new Error('Could not generate cover letter. Please try again.');
    }
};

module.exports = { generateCoverLetter };
