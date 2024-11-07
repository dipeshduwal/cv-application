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

    const coverLetter = `
    Dear Hiring Manager,

    I am writing to express my interest in the ${jobTitle} position at ${companyName}. With my background in various roles, including my experience as ${experiences}, I am confident in my ability to contribute to your team and the success of your company.

    I possess a strong skill set, including expertise in ${skills}, which I believe aligns well with the qualifications you are seeking for this position. Additionally, my educational background in ${education} has provided me with the foundational knowledge to excel in this role.

    I am excited about the opportunity to contribute to ${companyName} and would be thrilled to further discuss how my skills and experiences can benefit your organization. Thank you for considering my application. 

    Sincerely,
    ${fullName}
    Email: ${email}
    `;

    return coverLetter;
};

module.exports = { generateCoverLetter };
