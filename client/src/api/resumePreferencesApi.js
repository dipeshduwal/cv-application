import axiosInstance from './axiosInstance';

const savePreferences = async (email, preferences) => {
    const response = await axiosInstance.post('/user/save-preferences', {
        email, ...preferences,
    });
    return response.data;
};

const getUserPreferences = async (email) => {
    const response = await axiosInstance.get('/user/', {
        params: { email },
    });
    return response.data;
};

export { savePreferences, getUserPreferences };
