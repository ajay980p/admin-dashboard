export const apiRoutes = {
    login: '/auth/login',
    logout: '/auth/logout',
    self: '/auth/self',

    // For User Like Consumer, Admin, Manager
    getAllUserList: '/users/getUserList',
    createUser: '/auth/createUser',


    // For Tenants Like Restaurant, Hotel, etc
    getAllTenantsList: '/tenants/getAllTenantsList',
}