import {
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type {
    AuthContextInterface,
    AuthState,
} from "../types";

import { getApiResponseErrorMsg } from "@services/api.service";
import { getTryCatchErrorMsg } from "@utils/getTryCatchErrorMsg";
import { ENV } from "@config/env";
import Loading from "@shared/Loading";

import { AuthContext } from "./auth.ctx";
import { mockTokenRefresh } from "../api/token-refresh.mock";

interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Auth Provider.
 * Provide children with authentication state and 
 * access token
 */
export default function AuthProvider({
    children,
}: AuthProviderProps) {
    const [authState, setAuthState] = useState<AuthState>({
        status: "initializing",
    });

    /**
     * Stores a valid access token in application memory.
     *
     * The caller is responsible for performing the login or refresh
     * request and validating its response before calling this function.
     */
    const login = (accessToken: string): void => {
        setAuthState({
            status: "authenticated",
            accessToken,
        });
    }

    /**
     * Clears the access token from application memory.
     *
     * The caller is responsible for performing any server-side logout
     * request before calling this function.
     */
    const logout = (): void => {
        setAuthState({
            status: "unauthenticated",
        });
    };

    /**
     * Attempts to restore the authenticated session when the app starts.
     *
     * The refresh token is expected to be sent automatically through
     * a Secure, HttpOnly cookie.
     */
    useEffect(() => {
        let active = true;

        const initializeAuth = async (): Promise<void> => {
            try {
                const response = await mockTokenRefresh();

                if (!response.success || !response.data?.access) {
                    throw new Error(
                        getApiResponseErrorMsg(
                            response,
                            "Token refresh failed.",
                        ),
                    );
                }

                if (!active) {
                    return;
                }

                login(response.data.access);
            } catch (error) {
                if (!active) {
                    return;
                }

                if (ENV.DEBUG) {
                    console.error(
                        getTryCatchErrorMsg(
                            error,
                            "Unable to restore the authenticated session.",
                        ),
                    );
                }

                logout();
            }
        };

        void initializeAuth();

        return () => {
            /**
             * This does not cancel the request. It only prevents the
             * completed request from updating an unmounted provider.
             */
            active = false;
        };
    }, []);

    console.log(authState);

    const value: AuthContextInterface = {
        authState,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {authState.status === "initializing" ? (
                <Loading />
            ) : (
                <>
                    {children}
                </>
            )}
        </AuthContext.Provider>
    );
}
