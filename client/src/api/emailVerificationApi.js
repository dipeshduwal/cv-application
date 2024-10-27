import axiosInstance from './axiosInstance';

const verifyOtp = async (email, otp) => {
    const response = await axiosInstance.post('/verification/verify-otp', { email, otp });
    return response.data;
  };

const resendOtp = async (email) => {
    const response = await axiosInstance.post('/verification/resend-otp', { email });
    return response.data;
};

export default {verifyOtp, resendOtp};
