export type AuthState =
    | {
        status: "initializing";
    }
    | {
        status: "authenticated";
        accessToken: string;
    }
    | {
        status: "unauthenticated";
    };

export interface AuthContextInterface {
    authState: AuthState;

    /**
     * Authenticates the user and stores the returned access token in memory.
     *
     * Rejects when authentication fails so the login form can display
     * the appropriate error.
     */
    login: (accessToken: string) => void;

    /**
     * Attempts to invalidate the refresh-token cookie on the server and
     * always clears the local access token.
     *
     * It may reject after clearing the local session if the server request
     * fails.
     */
    logout: () => void;

}
