import { createBrowserRouter, type RouteObject } from 'react-router';
import Root from '../root';
import ErrorElement from '@shared/ErrorElement';
import NotFoundPage from '@global/NotFoundPage';
import { landingRoutes } from '@app/landing';
import { authRoutes } from '@app/auth';

const allRoutes: RouteObject[] = [
    {
        element: <Root />,
        errorElement: <ErrorElement />,
        children: [landingRoutes, authRoutes],
    },

    // Undefined Routes
    { path: '*', element: <NotFoundPage /> },
];

const router = createBrowserRouter(allRoutes);
export default router;
