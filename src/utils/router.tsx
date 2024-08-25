import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Categories from "../pages/Categories";
import Login from "../pages/auth/Login";
import Dashboard from "../layouts/Dashboard";
import NoAuth from "../layouts/NoAuth";

export const router = createBrowserRouter([
    {
        path: "/",
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

])