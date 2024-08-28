export const apiRoutes = {
    login: '/auth/login',
    logout: '/auth/logout',
    self: '/auth/self',

    // For User Like Consumer, Admin, Manager
    getAllUserList: '/users/getUserList',
    createUser: '/auth/createUser',
    updateUser: '/users/updateUser',


    // For Tenants Like Restaurant, Hotel, etc
    getAllTenantsList: '/tenants/getAllTenantsList',
    createTenant: '/tenants/createTenant',


    // For Products
    getAllProductsList: '/product/getAllProducts',
    createProduct: '/product/createProduct',


    // For Categories
    getCategoryList: '/category/getAllCategories',
}