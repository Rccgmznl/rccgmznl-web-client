import PublicRoute from "@router/PublicRoute";
import { Outlet, type RouteObject } from "react-router";
import LoginPage from "./pages/LoginPage";
import { PATHS } from "@router/paths";

export const authRoutes: RouteObject = {
    path: PATHS.AUTH,
    element: <PublicRoute children={<Outlet />} />,
    children: [
        { path: "login", element: <LoginPage /> },
    ]
}
