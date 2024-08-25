import { api } from "./client"
// import { Credentials } from "../Types"


// Auth Service
export const login = (credentials: { email: string, password: string }) => api.post("/auth/login", credentials)

export const self = () => api.post("/auth/self")