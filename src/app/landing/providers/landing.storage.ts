import { ENV } from "@config/env";
import { getTryCatchErrorMsg } from "@utils/getTryCatchErrorMsg";
import type { LandingSession } from "../types";

export const LANDING_SESSION_STORAGE_KEY =
    "rccgmznl:landing-session";

export function getLandingSession() {
    try {
        const storageKey = `${LANDING_SESSION_STORAGE_KEY}`;

        /**
         * Raw serialized landing session from localStorage.
         */
        const rawSession = localStorage.getItem(storageKey);

        if (!rawSession) {
            return null;
        }

        /**
         * Parse the cached JSON value.
         *
         * This cast does not fully validate the shape. The basic checks below
         * protect the most important assumptions needed by the app.
         */
        const draft = JSON.parse(rawSession) as LandingSession;

        /**
         * Basic defensive checks.
         *
         * The cached session must:
         * - exist
         */
        if (!draft || typeof draft !== "object") {
            return null;
        }

        return draft;

    } catch (error) {
        /**
         * Corrupted storage, invalid JSON, or localStorage access issues should
         * never crash runtime flow.
         */
        const errMsg =
            getTryCatchErrorMsg(
                error,
                "Failed to retrieve landing session"
            );
        if (ENV.DEBUG) {
            console.error(errMsg);
        }

        return null;
    }
}

export function saveLandingSession(
    session: LandingSession,
): boolean {

    try {
        const storageKey = `${LANDING_SESSION_STORAGE_KEY}`;

        /**
         * Serialize the active session before saving.
         */
        const serializedSession = JSON.stringify(session);

        localStorage.setItem(
            storageKey,
            serializedSession,
        );

        return true;

    } catch (error) {
        /**
         * Storage quota issues or serialization failures should not crash
         * runtime flow.
         */

        const errMsg =
            getTryCatchErrorMsg(
                error,
                "Failed to save landing session"
            );
        if (ENV.DEBUG) {
            console.error(errMsg);
        }

        return false;
    }
}

export function removeLandingSession(): boolean {
    try {
        const storageKey = LANDING_SESSION_STORAGE_KEY;

        localStorage.removeItem(storageKey);

        return true;

    } catch (error) {
        /**
         * localStorage errors should not crash runtime flow.
         */

        const errMsg =
            getTryCatchErrorMsg(
                error,
                "Failed to remove landing session"
            );
        if (ENV.DEBUG) {
            console.error(errMsg);
        }

        return false;
    }
}
