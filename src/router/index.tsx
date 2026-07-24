import { createBrowserRouter, type RouteObject } from "react-router";
import Root from "../root";
import ErrorElement from "@shared/ErrorElement";
import NotFoundPage from "@global/NotFoundPage";
import { landingRoutes } from "@app/landing";


const allRoutes: RouteObject[] = [
    {
        element: <Root />,
        errorElement: <ErrorElement/>,
        children: [
            landingRoutes,
        ]
    },

    // Undefined Routes
    { path: '*', element: <NotFoundPage /> },
]

const router = createBrowserRouter(allRoutes);
export default router;
