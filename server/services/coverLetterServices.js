let coverLetterIndex = 0;

const generateCoverLetter = (resumeData, jobDetails) => {
    if (typeof resumeData === 'string') {
        try {
            resumeData = JSON.parse(resumeData);
        } catch (error) {
            console.error("Error parsing resumeData JSON:", error);
            throw new Error("Invalid JSON format in resumeData");
        }
    }

    if (typeof jobDetails === 'string') {
        try {
            jobDetails = JSON.parse(jobDetails);
        } catch (error) {
            console.error("Error parsing jobDetails JSON:", error);
            throw new Error("Invalid JSON format in jobDetails");
        }
    }

    const fullName = resumeData.personalInfo.fullName;
    const phone = resumeData.personalInfo.phone;
    const email = resumeData.personalInfo.personalEmail;
    const jobTitle = jobDetails.jobTitle;
    const companyName = jobDetails.companyName;

    const experiences = resumeData.experiences
        .map(exp => `${exp.position} at ${exp.company}`)
        .join(', ');
    const skills = resumeData.skills.map(skill => skill.skillName).join(', ');
    const education = resumeData.educations
        .map(edu => `${edu.degree} in ${edu.fieldOfStudy} from ${edu.school}`)
        .join(', ');

    const sampleCoverLetters = [`
    Dear Hiring Manager,

    I am writing to express my interest in the ${jobTitle} position at ${companyName}. With my background in various roles, including my experience as ${experiences}, I am confident in my ability to contribute to your team and the success of your company.

    I possess a strong skill set, including expertise in ${skills}, which I believe aligns well with the qualifications you are seeking for this position. Additionally, my educational background in ${education} has provided me with the foundational knowledge to excel in this role.

    I am excited about the opportunity to contribute to ${companyName} and would be thrilled to further discuss how my skills and experiences can benefit your organization. Thank you for considering my application. 

    Sincerely,
    ${fullName}
    Phone: ${phone}
    Email: ${email}
    `,
    `
    Dear Talent Acquisition Team,

    I am excited to apply for the ${jobTitle} role at ${companyName}. With my experience in roles such as ${experiences}, I bring a wealth of knowledge and expertise that I believe will be beneficial to your team. My proficiency in ${skills} and my academic background in ${education} have prepared me well for the demands of this role.

    I am eager to bring my skills and dedication to ${companyName} and would welcome the chance to discuss how I can contribute to your goals. Thank you for considering my application.

    Best regards,
    ${fullName}
    Phone: ${phone}
    Email: ${email}
    `,
    `
    Dear HR Team at ${companyName},

    I am very interested in the ${jobTitle} position and am confident that my background aligns with the requirements of this role. My professional journey includes roles like ${experiences}, where I honed skills in ${skills}. My education in ${education} has further enriched my ability to contribute effectively.

    I would be thrilled to bring my expertise to your team and am excited to discuss my qualifications further. Thank you for considering my application; I look forward to the opportunity.

    Warm regards,
    ${fullName}
    Phone: ${phone}
    Email: ${email}
    `
    ];

    const coverLetter = sampleCoverLetters[coverLetterIndex];

    coverLetterIndex = (coverLetterIndex + 1) % sampleCoverLetters.length;

    return coverLetter;
};

module.exports = { generateCoverLetter };
