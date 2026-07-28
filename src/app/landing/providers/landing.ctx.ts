import { createContext, useContext } from "react";
import type { LandingContextInterface } from "../types";

export const LandingContext = createContext<
    LandingContextInterface | undefined
>(undefined);

/**
 * @throws {Error} When called outside of an AuthProvider.
 */
export function useLandingContext(): LandingContextInterface {
    const context = useContext(LandingContext);

    if (context === undefined) {
        throw new Error(
            "useLandingContext must be used within an LandingProvider.",
        );
    }

    return context;
}
