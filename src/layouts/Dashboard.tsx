import { Link, Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../utils/store';

const Dashboard = () => {
    const { user } = useAuthStore();

    if (user === null) {
        return <Navigate to="/auth/login" replace={true} />;
    }

    return (
        <div>

            <div>This is Header.</div>

            <Link to="/auth/login">Click here to login</Link>

            <Outlet />
        </div>
    )
}

export default Dashboard