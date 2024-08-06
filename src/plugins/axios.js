import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Accept"]= 'application/json';
    return config;
});

http.interceptors.response.use(
    (response) => {
        return response; // Mengembalikan keseluruhan objek respons
    },
    (error) => {
        return Promise.resolve(error.response);
    }
);

export default http;
