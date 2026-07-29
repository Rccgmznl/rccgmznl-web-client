import {
    createContext,
    useContext,
} from "react";

import type { LandingContextInterface } from "../types";

/**
 * Provides landing-page session state and actions.
 *
 * The default value is intentionally undefined so that using the context
 * outside of LandingProvider produces a clear runtime error.
 */
export const LandingContext = createContext<
    LandingContextInterface | undefined
>(undefined);

/**
 * Returns the current landing-page context.
 *
 * @throws {Error} When called outside of LandingProvider.
 */
export function useLandingContext(): LandingContextInterface {
    const context = useContext(LandingContext);

    if (context === undefined) {
        throw new Error(
            "useLandingContext must be used within a LandingProvider.",
        );
    }

    return context;
}
