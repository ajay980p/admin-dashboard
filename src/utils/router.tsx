import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Categories from "../pages/Categories";
import Login from "../pages/auth/Login";
import Dashboard from "../layouts/Dashboard";
import NoAuth from "../layouts/NoAuth";
import Root from "../layouts/Root";
import Users from "../pages/Users";

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