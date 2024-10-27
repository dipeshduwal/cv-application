import axiosInstance from './axiosInstance';

// Fetch all educations
export const fetchEducations = async () => {
    const response = await axiosInstance.get('/educations');
    return response.data;
};

// Add a new education
export const addEducation = async (data) => {
    const response = await axiosInstance.post('/educations', data);
    return response.data;
};

// Update an existing education
export const updateEducation = async (id, data) => {
    const response = await axiosInstance.put(`/educations/${id}`, data);
    return response.data;
};

// Delete an education
export const deleteEducation = async (id) => {
    await axiosInstance.delete(`/educations/${id}`);
};
