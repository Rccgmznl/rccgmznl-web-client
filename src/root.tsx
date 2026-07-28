import { Outlet } from "react-router";
import AuthProvider from "@features/auth";

export default function Root() {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
}
