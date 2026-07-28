export interface LandingSession {
    isEditMode: boolean
}

export interface LandingContextInterface {
    landingSession: LandingSession;
    updateLandingSession: (session: LandingSession) => void;
    removeLandingSession: () => void;
}
