import { TenantData } from "../../../utils/types";
import { apiRoutes } from "../apiRoutes";
import { api } from "../axios";

// To Get all Tenants List
export const getAllTenantsList = async (reqData: { currentPage: number, pageSize: number }) => {
    const response = await api.post(apiRoutes.getAllTenantsList, reqData)
    return response.data;
}

// To Create New Tenant
export const createNewTenant = async (userData: TenantData) => {
    const response = await api.post(apiRoutes.createTenant, userData)
    return response;
}