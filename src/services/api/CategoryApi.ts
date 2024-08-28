import { apiRoutes } from "../apiRoutes";
import { catalogService } from "../axios";

// To get Category List
export const getCategoryList = async () => {
    const response = await catalogService.post(apiRoutes.getCategoryList)
    return response.data;
}