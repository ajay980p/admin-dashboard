export const apiRoutes = {
    login: '/auth/auth/login',
    logout: '/auth/auth/logout',
    self: '/auth/auth/self',

    // For User Like Consumer, Admin, Manager
    getAllUserList: '/auth/users/getUserList',
    createUser: '/auth/auth/createUser',
    updateUser: '/auth/users/updateUser',


    // For Tenants Like Restaurant, Hotel, etc
    getAllTenantsList: '/auth/tenants/getAllTenantsList',
    createTenant: '/auth/tenants/createTenant',


    // For Products
    getAllProductsList: '/catalog/product/getAllProducts',
    createProduct: '/catalog/product/createProduct',


    // For Categories
    getCategoryList: '/catalog/category/getAllCategories',
}