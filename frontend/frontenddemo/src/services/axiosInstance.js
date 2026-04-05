import axios from 'axios';
import { refreshToken } from './authService';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return axios(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const localRefreshToken = localStorage.getItem('refreshToken');
            if (!localRefreshToken) {
                // Handle logout
                return Promise.reject(error);
            }

            try {
                const rs = await refreshToken(localRefreshToken);
                const { accessToken, refreshToken: newRefreshToken } = rs.data;
                localStorage.setItem('accessToken', accessToken.replace('Bearer ', ''));
                localStorage.setItem('refreshToken', newRefreshToken);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken.replace('Bearer ', '');
                processQueue(null, accessToken.replace('Bearer ', ''));
                return axios(originalRequest);
            } catch (_error) {
                processQueue(_error, null);
                // Handle logout
                return Promise.reject(_error);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
