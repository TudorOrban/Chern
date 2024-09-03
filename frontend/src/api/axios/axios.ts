import axios from "axios";

export const API_URL = 'http://localhost:3000/api/v1';

const API = axios.create({
    baseURL: API_URL,
});

API.interceptors.request.use(
    config => {
        const token = localStorage.getItem("userToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default API;