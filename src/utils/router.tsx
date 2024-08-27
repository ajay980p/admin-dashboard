import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Categories from "../pages/Categories";
import Login from "../pages/auth/Login";
import Dashboard from "../layouts/Dashboard";
import NoAuth from "../layouts/NoAuth";
import Root from "../layouts/Root";
import Users from "../pages/users/Users";
import Tenants from "../pages/tenants/Tenants";
import Menus from "../pages/menus/Menus";
import Orders from "../pages/orders/Orders";
import Sales from "../pages/sales/Sales";
import Promos from "../pages/promos/Promos";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Dashboard />,
                children: [
                    {
                        path: "",
                        element: <HomePage />
                    },
                    {
                        path: "categories",
                        element: <Categories />
                    },
                    {
                        path: "users",
                        element: <Users />
                    },
                    {
                        path: "tenants",
                        element: <Tenants />
                    },
                    {
                        path: "menu",
                        element: <Menus />
                    },
                    {
                        path: "orders",
                        element: <Orders />
                    },
                    {
                        path: "sales",
                        element: <Sales />
                    },
                    {
                        path: "promos",
                        element: <Promos />
                    },
                ]
            },
            {
                path: "/auth",
                element: <NoAuth />,
                children: [
                    {
                        path: "login",
                        element: <Login />
                    },
                ]
            },
        ]
    }
])