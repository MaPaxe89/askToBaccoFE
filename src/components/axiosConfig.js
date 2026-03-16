import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

api.interceptors.request.use((config) => {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
        const user = JSON.parse(userStorage);
        if (user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
    }
    return config;
});

export default api;