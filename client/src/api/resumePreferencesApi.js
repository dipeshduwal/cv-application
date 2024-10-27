import axiosInstance from './axiosInstance';

const savePreferences = async (email, preferences) => {
    const response = await axiosInstance.post('/user/save-preferences', {
      email, ...preferences,
    });
    return response.data;
};

export default savePreferences;
