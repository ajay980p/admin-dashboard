import { useQuery } from "@tanstack/react-query"
import { Outlet } from "react-router-dom"
import { self } from "../pages/services/api";
import { useAuthStore } from "../utils/store";
import { useEffect } from "react";
import LoadingSpinner from "../pages/sharedComponent/LoadingSpinner";

// To check if user is authenticated
const getSelf = async () => {
    const { data } = await self();
    return data;
}
const Root = () => {
    const { setUser } = useAuthStore();

    const { data: userData, isLoading } = useQuery({
        queryKey: ['self'],
        queryFn: getSelf,
    })

    useEffect(() => {
        if (userData) {
            setUser(userData.data);
        }
    }, [userData, setUser])

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <Outlet />
    )
}

export default Root