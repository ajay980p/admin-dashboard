import { apiRoutes } from "./apiRoutes";
import { api } from "./axios"


// To login a User
export const login = async (credentials: { email: string, password: string }) => {
    const response = await api.post(apiRoutes.login, credentials)
    return response;
}


// To check if user is authenticated
export const self = async () => {
    const response = await api.post(apiRoutes.self, '')
    return response;
}


// To logout a User
export const logout = async () => {
    const response = await api.post(apiRoutes.logout, '')
    return response;
}


// To Get all User
export const getAllUserList = async () => {
    const response = await api.post(apiRoutes.getAllUserList, '')
    return response;
}


// To Get all Tenants List
export const getAllTenantsList = async () => {
    const response = await api.post(apiRoutes.getAllTenantsList, '')
    return response;
}