import { apiRoutes } from "../apiRoutes";
import { catalogService } from "../axios";

// To Get all Products List
export const getAllProductsList = async () => {
    const response = await catalogService.post(apiRoutes.getAllProductsList)
    return response.data;
}

// To Create New Product
export const createNewProduct = async (productData: any) => {
    const response = await catalogService.post(apiRoutes.createProduct, productData)
    return response;
}

