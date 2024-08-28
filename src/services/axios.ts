import axios from 'axios';

// Auth Service Axios Instance
export const authService = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_AUTH_SERVICE || 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
    },
});

authService.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
);



// Catalog Service Axios Instance
export const catalogService = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_CATALOG_SERVICE || 'http://localhost:4000/api',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
    },
});
catalogService.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
);