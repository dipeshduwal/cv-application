import axiosInstance from './axiosInstance';

export const fetchExperiences = async () => {
    const response = await axiosInstance.get('/experiences');
    return response.data;
};

export const addExperience = async (data) => {
    const response = await axiosInstance.post('/experiences', data);
    return response.data;
};

export const updateExperience = async (id, data) => {
    const response = await axiosInstance.put(`/experiences/${id}`, data);
    return response.data;
};

export const deleteExperience = async (id) => {
    await axiosInstance.delete(`/experiences/${id}`);
};