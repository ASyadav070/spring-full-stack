import axios from './axiosInstance';

const API_URL = '/api/user';

export const getAllUsers = () => {
    return axios.get(`${API_URL}/all`);
};

export const deleteUser = (userId) => {
    return axios.delete(`${API_URL}/delete/${userId}`);
};
