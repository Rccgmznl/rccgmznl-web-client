import { useAuthContext } from '@features/auth';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

interface PublicRouteProps {
    children: ReactNode;
}

/**
 * Restricts access to routes intended only for unauthenticated users,
 * such as the login and registration pages.
 *
 * While the provider restores the user's session, public content is
 * withheld to prevent the login page from briefly appearing before
 * an authenticated user is redirected.
 *
 * Authenticated users are redirected to the application's home page.
 */
export default function PublicRoute({ children }: PublicRouteProps) {
    const { authState } = useAuthContext();

    if (authState.status === 'authenticated') {
        return <Navigate to="/" replace />;
    }

    return children;
}
