import axiosInstance from './axiosInstance';

export const fetchEducations = async () => {
    const response = await axiosInstance.get('/educations');
    return response.data;
};

export const addEducation = async (data) => {
    const response = await axiosInstance.post('/educations', data);
    return response.data;
};

export const updateEducation = async (id, data) => {
    const response = await axiosInstance.put(`/educations/${id}`, data);
    return response.data;
};

export const deleteEducation = async (id) => {
    await axiosInstance.delete(`/educations/${id}`);
};
