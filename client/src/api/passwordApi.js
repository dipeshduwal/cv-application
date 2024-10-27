import axiosInstance from './axiosInstance';

export const requestOtp = async (email) => {
        const response = await axiosInstance.post('/password/forgot-password', { email });
        return response.data;
};

export const resetPassword = async (email, otp, newPassword) => {
    const response = await axiosInstance.post('/password/reset-password', {
        email,
        otp,
        newPassword,
    });
    return response.data; 
};
