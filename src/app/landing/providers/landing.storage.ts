import { ENV } from '@config/env';
import { getTryCatchErrorMsg } from '@utils/getTryCatchErrorMsg';
import type { LandingSession } from '../types';

/**
 * localStorage key used to persist landing-page UI preferences.
 */
export const LANDING_SESSION_STORAGE_KEY = 'rccgmznl:landing-session';

/**
 * Checks whether an unknown value contains a valid landing session.
 *
 * Values read from localStorage cannot be trusted because they may be
 * outdated, corrupted, or manually modified by the user.
 */
function isLandingSession(value: unknown): value is LandingSession {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const session = value as Record<string, unknown>;

    return typeof session.isEditMode === 'boolean';
}

/**
 * Retrieves and validates the persisted landing-page session.
 *
 * Returns null when no session exists, the stored value is invalid,
 * or localStorage cannot be accessed.
 */
export function getLandingSession(): LandingSession | null {
    try {
        const rawSession = localStorage.getItem(LANDING_SESSION_STORAGE_KEY);

        if (rawSession === null) {
            return null;
        }

        const parsedSession: unknown = JSON.parse(rawSession);

        if (!isLandingSession(parsedSession)) {
            return null;
        }

        return parsedSession;
    } catch (error) {
        /**
         * Invalid JSON, restricted browser storage, or other storage errors
         * should not prevent the application from loading.
         */
        if (ENV.DEBUG) {
            console.error(
                getTryCatchErrorMsg(
                    error,
                    'Failed to retrieve landing session.'
                )
            );
        }

        return null;
    }
}

/**
 * Persists the current landing-page session.
 *
 * Returns false when the session cannot be serialized or localStorage
 * cannot be written to.
 */
export function saveLandingSession(session: LandingSession): boolean {
    try {
        localStorage.setItem(
            LANDING_SESSION_STORAGE_KEY,
            JSON.stringify(session)
        );

        return true;
    } catch (error) {
        /**
         * Storage quota, restricted browser storage, and serialization
         * failures should not interrupt the current application session.
         */
        if (ENV.DEBUG) {
            console.error(
                getTryCatchErrorMsg(error, 'Failed to save landing session.')
            );
        }

        return false;
    }
}

/**
 * Removes the persisted landing-page session.
 *
 * Returns false when localStorage cannot be accessed.
 */
export function removeLandingSession(): boolean {
    try {
        localStorage.removeItem(LANDING_SESSION_STORAGE_KEY);

        return true;
    } catch (error) {
        if (ENV.DEBUG) {
            console.error(
                getTryCatchErrorMsg(error, 'Failed to remove landing session.')
            );
        }

        return false;
    }
}
