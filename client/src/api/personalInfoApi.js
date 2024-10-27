import axiosInstance from './axiosInstance';

export const fetchPersonalInfos = async () => {
    const response = await axiosInstance.get('/infos');
    return response.data;
};

export const createOrUpdate = async (formData) => {
    const response = await axiosInstance.post('/infos', formData,{
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};
