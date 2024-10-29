import axiosInstance from './axiosInstance';

export const fetchPersonalInfos = async () => {
    const response = await axiosInstance.get('/infos');
    return response.data;
};

export const savePersonalInfo = async (data, photo = null) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    if (photo) {
        formData.append('profileImage', photo);
    }

    const response = await axiosInstance.post('/infos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
};

export const deletePersonalInfo = async (id) => {
    await axiosInstance.delete(`/infos/${id}`);
};

