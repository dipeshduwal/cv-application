import axiosInstance from './axiosInstance';

export const fetchSkills = async () => {
    const response = await axiosInstance.get('/skills');
    return response.data;
};

export const addSkill = async (data) => {
    const response = await axiosInstance.post('/skills', data);
    return response.data;
};

export const updateSkill = async (id, data) => {
    const response = await axiosInstance.put(`/skills/${id}`, data);
    return response.data;
};

export const deleteSkill = async (id) => {
    await axiosInstance.delete(`/skills/${id}`);
};