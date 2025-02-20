import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_APP_API_VERSION}/`
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Токен из localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
