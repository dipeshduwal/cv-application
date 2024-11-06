const {generateCoverLetter} = require('../services/coverLetterServices');

const generateCoverLetterController = async (req, res) => {
    const { resumeData, jobDetails } = req.body;

    if (!resumeData || !jobDetails) {
        return res.status(400).json({ error: 'Resume data and job details are required.' });
    }

    try {
        const coverLetter = await generateCoverLetter(resumeData, jobDetails);
        res.status(200).json({ coverLetter });
    } catch (error) {
        console.error('Controller error:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { generateCoverLetterController };
