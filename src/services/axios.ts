import axios from 'axios';

// Auth Service Axios Instance
export const axiosService = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_SERVICE || 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
    },
});

axiosService.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
);