import { type RouteObject } from 'react-router';
import { PATHS } from '@router/paths';
import LoginPage from './pages/LoginPage';
import AuthLayout from './layouts/AuthLayout';

export const authRoutes: RouteObject = {
    path: PATHS.AUTH,
    element: <AuthLayout />,
    children: [{ path: 'login', element: <LoginPage /> }],
};
