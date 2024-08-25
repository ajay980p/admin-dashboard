import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
});

// ==============================|| AXIOS - FOR API SERVICES ||============================== //


// api.interceptors.request.use(
//     (config) => {
//         return new Promise((resolve) => {
//             resolve(config);
//         });
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
);