import PublicRoute from '@router/PublicRoute';
import { Outlet } from 'react-router';

export default function AuthLayout() {
    return (
        <PublicRoute>
            <Outlet />
        </PublicRoute>
    );
}
