import { updateUserDataInterface, UserData } from "../../../utils/types";
import { apiRoutes } from "../apiRoutes";
import { api } from "../axios";

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
export const getAllUserList = async (reqData: { currentPage: number, pageSize: number, search: string, searchRole: string }) => {
    const response = await api.post(apiRoutes.getAllUserList, reqData)
    return response.data;
}

// To Create New User
export const createNewUser = async (userData: UserData) => {
    const response = await api.post(apiRoutes.createUser, userData)
    return response;
}

// To Update New User
export const updateUserData = async (userData: updateUserDataInterface) => {
    const response = await api.post(apiRoutes.updateUser, userData)
    return response;
}