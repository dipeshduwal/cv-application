import axiosInstance from './axiosInstance';

export const generateCoverLetterApi = (resumeData, jobDetails) => {
    return axiosInstance.post('/coverletter', {
        resumeData: JSON.stringify(resumeData),
        jobDetails: JSON.stringify(jobDetails),
    });
};
