import LandingProvider from "@app/landing/providers/landing.provider";
import { Outlet } from "react-router";

export default function LandingLayout() {
    return (
        <LandingProvider>
            <Outlet />
        </LandingProvider>
    );
}
