import { updateUserDataInterface, UserData } from "../../utils/types";
import { apiRoutes } from "../apiRoutes";
import { authService } from "../axios";

// To login a User
export const login = async (credentials: { email: string, password: string }) => {
    const response = await authService.post(apiRoutes.login, credentials)
    return response;
}


// To check if user is authenticated
export const self = async () => {
    const response = await authService.post(apiRoutes.self, '')
    return response;
}


// To logout a User
export const logout = async () => {
    const response = await authService.post(apiRoutes.logout, '')
    return response;
}

// To Get all User
export const getAllUserList = async (reqData: { currentPage: number, pageSize: number, search: string, searchRole: string }) => {
    const response = await authService.post(apiRoutes.getAllUserList, reqData)
    return response.data;
}

// To Create New User
export const createNewUser = async (userData: UserData) => {
    const response = await authService.post(apiRoutes.createUser, userData)
    return response;
}

// To Update New User
export const updateUserData = async (userData: updateUserDataInterface) => {
    const response = await authService.post(apiRoutes.updateUser, userData)
    return response;
}