import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api/v1",
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