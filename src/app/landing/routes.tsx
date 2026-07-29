import { type RouteObject } from "react-router";
import LandingLayout from "./layouts/LandingLayout";
import LandingHomePage from "./pages/LandingHomePage";
import { PATHS } from "@router/paths";

export const landingRoutes: RouteObject = {
    path: PATHS.LANDING,
    element: <LandingLayout />,
    children: [
        { index: true, element: <LandingHomePage /> },
    ]
}
