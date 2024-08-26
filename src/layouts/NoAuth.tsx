import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../utils/store';

const NoAuth = () => {
    const { user } = useAuthStore();
    const location = useLocation();

    if (user !== null) {
        const returnTo = new URLSearchParams(location.search).get('returnTo') || '/';
        return <Navigate to={returnTo} replace={true} />;
    }

    return (
        <div>

            <Outlet />
        </div>
    )
}

export default NoAuth;