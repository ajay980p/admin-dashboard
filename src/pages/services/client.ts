import axios from "axios";


export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3333",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})