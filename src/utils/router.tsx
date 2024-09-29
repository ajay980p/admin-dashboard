import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Categories from "../pages/categories/Categories";
import Login from "../pages/auth/Login";
import Dashboard from "../layouts/Dashboard";
import NoAuth from "../layouts/NoAuth";
import Root from "../layouts/Root";
import Users from "../pages/users/Users";
import Tenants from "../pages/tenants/Tenants";
import Orders from "../pages/orders/Orders";
import Sales from "../pages/sales/Sales";
import Promos from "../pages/promos/Promos";
import Products from "../pages/products/Products";

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
                    {
                        path: "products",
                        element: <Products />
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