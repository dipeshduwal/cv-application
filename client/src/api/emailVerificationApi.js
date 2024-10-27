import axiosInstance from './axiosInstance';

export const verifyOtp = async (email, otp) => {
    const response = await axiosInstance.post('/verification/verify-otp', { email, otp });
    return response.data;
  };

export const resendOtp = async (email) => {
    const response = await axiosInstance.post('/verification/resend-otp', { email });
    return response.data;
};


