import axios from './axiosInstance';

const API_URL = '/api/user';

export const login = (email, password) => {
    return axios.post(`${API_URL}/login`, { email, password });
};

export const register = (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const refreshToken = (token) => {
    return axios.post(`${API_URL}/refresh-token`, { refreshToken: token });
};
