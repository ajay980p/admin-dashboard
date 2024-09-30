import { apiRoutes } from "../apiRoutes";
import { axiosService } from "../axios";

// To get Category List
export const getCategoryList = async () => {
    const response = await axiosService.post(apiRoutes.getCategoryList)
    return response.data;
}