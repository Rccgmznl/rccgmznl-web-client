import PublicRoute from "@router/PublicRoute";
import { Outlet, type RouteObject } from "react-router";
import LoginPage from "./pages/LoginPage";

export const authRoutes: RouteObject = {
    path: "auth",
    element: <PublicRoute children={<Outlet />} />,
    children: [
        { path: "login", element: <LoginPage /> },
    ]
}
