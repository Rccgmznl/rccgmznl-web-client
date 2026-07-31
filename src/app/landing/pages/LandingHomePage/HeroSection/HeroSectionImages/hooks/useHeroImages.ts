import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { getApiResponseErrorMsg } from "@services/api.service";

import {
    mockGetHeroImages,
    mockUpdateHeroImages,
} from "../api/hero-images.mock";
import type { HeroImage } from "../types";

/**
 * Duration for which cached hero images are considered fresh.
 *
 * While the query is fresh, React Query will return the cached data without
 * automatically requesting it again.
 *
 * Hero images are expected to change infrequently in production, so a
 * 30-minute stale time reduces unnecessary network requests.
 */
const HERO_IMAGES_STALE_TIME = 30 * 60 * 1000;

/**
 * Duration unused hero-image query data remains in memory.
 *
 * Once no component is using the query, React Query keeps the cached data for
 * two hours before removing it through garbage collection.
 */
const HERO_IMAGES_GC_TIME = 2 * 60 * 60 * 1000;

/**
 * Centralized React Query keys for hero-image operations.
 *
 * Keeping query keys in one object prevents key mismatches between queries,
 * mutations, cache updates, and future invalidation calls.
 */
export const heroImagesQueryKeys = {
    /**
     * Root key for all hero-image-related cache entries.
     */
    all: ["rccgmznl", "hero-images"] as const,

    /**
     * Cache key for the ordered list of hero images.
     */
    list: () => [
        ...heroImagesQueryKeys.all,
        "list",
    ] as const,

    /**
     * Mutation key for hero-image update operations.
     */
    update: () => [
        ...heroImagesQueryKeys.all,
        "update",
    ] as const,
};

/**
 * Fetches the current ordered list of hero images.
 *
 * In production, replace `mockGetHeroImages` with the real API service
 * responsible for retrieving the hero-image configuration.
 *
 * @returns The ordered hero-image list.
 *
 * @throws Error when the request fails or the returned payload is invalid.
 */
async function getHeroImages(): Promise<HeroImage[]> {
    const response = await mockGetHeroImages();

    if (!response.success || !response.data) {
        throw new Error(
            getApiResponseErrorMsg(
                response,
                "Failed to fetch hero images",
            ),
        );
    }

    /**
     * Runtime validation protects the application from malformed API
     * responses even when the expected response is statically typed.
     */
    if (!Array.isArray(response.data)) {
        throw new Error(
            "The hero images response was invalid.",
        );
    }

    return response.data;
}

/**
 * Replaces the current hero-image configuration with the supplied ordered
 * list.
 *
 * The array position represents the display order. Removing an item from the
 * payload removes it from the submitted configuration, while moving an item
 * changes its order.
 *
 * In production, replace `mockUpdateHeroImages` with the real API service
 * responsible for persisting hero-image changes.
 *
 * @param payload The complete ordered hero-image list to persist.
 * @returns The canonical hero-image list returned by the server.
 *
 * @throws Error when the update fails or the returned payload is invalid.
 */
async function updateHeroImages(
    payload: HeroImage[],
): Promise<HeroImage[]> {
    const response = await mockUpdateHeroImages(payload);

    if (!response.success) {
        throw new Error(
            getApiResponseErrorMsg(
                response,
                "Failed to update hero images",
            ),
        );
    }

    /**
     * Validate the server response before placing it into the React Query
     * cache.
     */
    if (!Array.isArray(response.data)) {
        throw new Error(
            "The updated hero images response was invalid.",
        );
    }

    return response.data;
}

/**
 * Retrieves and caches the ordered hero-image list.
 *
 * Production behaviour:
 * - Treats cached data as fresh for 30 minutes.
 * - Retains inactive cached data for two hours.
 * - Retries failed reads up to two times.
 * - Does not refetch when the browser window regains focus.
 * - Refetches after the client reconnects to the network.
 *
 * @returns The React Query result containing hero-image data, loading state,
 * error state, and refetch controls.
 */
export function useHeroImages() {
    return useQuery<HeroImage[], Error>({
        queryKey: heroImagesQueryKeys.list(),
        queryFn: getHeroImages,

        staleTime: HERO_IMAGES_STALE_TIME,
        gcTime: HERO_IMAGES_GC_TIME,

        retry: 2,

        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });
}

/**
 * Updates the complete ordered hero-image list.
 *
 * After a successful update, the mutation writes the server response directly
 * into the existing hero-image query cache. This avoids an additional network
 * request while ensuring the UI reflects the server's canonical result.
 *
 * Mutation retries are disabled because repeating a write request
 * automatically may produce unintended duplicate or conflicting operations,
 * depending on the production API implementation.
 *
 * @returns The React Query mutation object used to execute and observe the
 * hero-image update.
 */
export function useUpdateHeroImages() {
    const queryClient = useQueryClient();

    return useMutation<
        HeroImage[],
        Error,
        HeroImage[]
    >({
        mutationKey: heroImagesQueryKeys.update(),
        mutationFn: updateHeroImages,

        retry: false,

        onSuccess: (updatedHeroImages) => {
            queryClient.setQueryData<HeroImage[]>(
                heroImagesQueryKeys.list(),

                // Ensure the cache receives a new array reference.
                [...updatedHeroImages],
            );
        },
    });
}
