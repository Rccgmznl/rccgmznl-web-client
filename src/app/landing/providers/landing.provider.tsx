import { useState, type ReactNode } from "react";
import type { LandingContextInterface, LandingSession } from "../types";
import { getLandingSession, saveLandingSession } from "./landing.storage";
import { LandingContext } from "./landing.ctx";

const initLandingSession: LandingSession = {
    isEditMode: false,
}

export default function LandingProvider({
    children
}: {
    children: ReactNode
}) {
    const [landingSession, setLandingSession] = useState<LandingSession>(() => {
        const landingSession = getLandingSession();
        if (!landingSession) {
            return initLandingSession;
        }

        return landingSession;
    });

    const updateLandingSession = (session: LandingSession) => {
        saveLandingSession(session);
        setLandingSession(session);
    }

    const removeLandingSession = () => {
        removeLandingSession();
        setLandingSession(initLandingSession);
    }

    const value: LandingContextInterface = {
        landingSession,
        updateLandingSession,
        removeLandingSession
    }
    return (
        <LandingContext.Provider value={value}>
            {children}
        </LandingContext.Provider>
    );
}
