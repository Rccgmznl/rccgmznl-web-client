import { type RouteObject } from "react-router";
import LandingLayout from "./layouts/LandingLayout";
import LandingHomePage from "./pages/LandingHomePage";

export const landingRoutes: RouteObject = {
    path: "",
    element: <LandingLayout />,
    children: [
        { index: true, element: <LandingHomePage /> },
    ]
}
