import { apiRoutes } from "../apiRoutes";
import { axiosService } from "../axios";

// To Get all Products List
export const getAllProductsList = async () => {
    const response = await axiosService.post(apiRoutes.getAllProductsList)
    return response.data;
}

// To Create New Product
export const createNewProduct = async (productData: any) => {
    const response = await axiosService.post(apiRoutes.createProduct, productData)
    return response;
}

