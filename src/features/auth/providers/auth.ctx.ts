import { createContext, useContext } from 'react';
import type { AuthContextInterface } from '../types';

/**
 * Provides authentication state and actions to components within
 * the application.
 *
 * The default value is intentionally undefined so that accessing the
 * context outside of an AuthProvider produces a clear runtime error.
 */
export const AuthContext = createContext<AuthContextInterface | undefined>(
    undefined
);

/**
 * Returns the current authentication context.
 *
 * This hook must be used within an AuthProvider. Throwing here prevents
 * components from silently operating without access to authentication state.
 *
 * @throws {Error} When called outside of an AuthProvider.
 */
export function useAuthContext(): AuthContextInterface {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider.');
    }

    return context;
}
