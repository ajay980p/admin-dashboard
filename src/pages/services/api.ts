import { api } from "./client"
// import { Credentials } from "../Types"


// Auth Service
export const login = (credentials: { email: string, password: string }) => api.post("/api/auth/login", credentials)

export const self = () => api.post("/api/auth/self")

export const logout = () => api.post("/api/auth/logout")