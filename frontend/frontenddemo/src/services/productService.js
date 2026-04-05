import axios from './axiosInstance';

const API_URL = '/api/product';

export const getAllProducts = () => {
    return axios.get(`${API_URL}/all`);
};

export const getMyProducts = () => {
    return axios.get(`${API_URL}/my-products`);
};

export const deleteProduct = (productId) => {
    return axios.delete(`${API_URL}/delete/${productId}`);
};

export const createProduct = (productData) => {
    return axios.post(`${API_URL}/register`, productData);
};

export const updateProduct = (productId, productData) => {
    return axios.put(`${API_URL}/update/${productId}`, productData);
};
