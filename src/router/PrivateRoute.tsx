import { useAuthContext } from "@features/auth";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

interface PrivateRouteProps {
    children: ReactNode;
}

/**
 * Restricts access to routes that require authentication.
 *
 * While the provider restores the user's session, protected content is
 * withheld to prevent an incorrect redirect or a brief content flash.
 *
 * Unauthenticated users are redirected to the login page. Their original
 * location is preserved so the login page may return them after authentication.
 */
export default function PrivateRoute({
    children,
}: PrivateRouteProps) {
    const { authState } = useAuthContext();

    if (authState.status === "unauthenticated") {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
}
