export interface LandingSession {
    isEditMode: boolean;
}

export interface LandingContextInterface {
    landingSession: LandingSession;

    /**
     * Replaces the current landing-page session and persists it locally.
     */
    updateLandingSession: (session: LandingSession) => void;

    /**
     * Clears the persisted landing-page session and restores its defaults.
     */
    resetLandingSession: () => void;
}
