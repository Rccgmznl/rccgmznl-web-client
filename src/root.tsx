import { Outlet } from "react-router";
import AuthProvider from "@features/auth";
import ModalProvider from "@features/modal/providers";

export default function Root() {
    return (
        <AuthProvider>
            <ModalProvider>
                <Outlet />
            </ModalProvider>
        </AuthProvider>
    );
}
