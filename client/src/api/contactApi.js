import axiosInstance from './axiosInstance';

export const sendEmail = async (formData) => {
    const response = await axiosInstance.post('/contact', formData);
    return response.data;
};