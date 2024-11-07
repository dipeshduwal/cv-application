const {generateCoverLetter} = require('../services/coverLetterServices');

exports.generateCoverLetterController = async (req, res) => {
    const { resumeData, jobDetails } = req.body;

    if (!resumeData || !jobDetails) {
        return res.status(400).json({ error: 'Resume data and job details are required.' });
    }

    const coverLetter = generateCoverLetter(resumeData, jobDetails);
    return res.status(200).json({ coverLetter });
};

