import { useState, type ReactNode } from 'react';

import type { LandingContextInterface, LandingSession } from '../types';

import {
    getLandingSession,
    removeLandingSession as removeStoredLandingSession,
    saveLandingSession,
} from './landing.storage';

import { LandingContext } from './landing.ctx';

interface LandingProviderProps {
    children: ReactNode;
}

/**
 * Default landing-page session used when no valid persisted session exists.
 */
const DEFAULT_LANDING_SESSION: LandingSession = {
    isEditMode: false,
};

/**
 * Provides landing-page UI session state to the application.
 *
 * The session is restored from localStorage when the provider mounts and
 * remains synchronized with localStorage whenever it is updated.
 */
export default function LandingProvider({ children }: LandingProviderProps) {
    const [landingSession, setLandingSession] = useState<LandingSession>(() => {
        return getLandingSession() ?? DEFAULT_LANDING_SESSION;
    });

    /**
     * Updates the active landing-page session and persists the new value.
     *
     * React state is updated even when localStorage is unavailable, allowing
     * the current browser session to continue working normally.
     */
    const updateLandingSession = (session: LandingSession): void => {
        setLandingSession(session);
        saveLandingSession(session);
    };

    /**
     * Removes the persisted session and restores the default landing state.
     */
    const resetLandingSession = (): void => {
        removeStoredLandingSession();

        setLandingSession(DEFAULT_LANDING_SESSION);
    };

    const value: LandingContextInterface = {
        landingSession,
        updateLandingSession,
        resetLandingSession,
    };

    return (
        <LandingContext.Provider value={value}>
            {children}
        </LandingContext.Provider>
    );
}
