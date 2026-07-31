import { ENV } from "@config/env";
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";

import unavailableImg from "@shared/images/unavailable.png";

import type { HeroImage, HeroImagesQuery } from "./types";

const HERO_AUTOPLAY_DELAY = 8_000;

/*
 * Store image-loading promises by URL so the browser is not asked
 * to repeatedly preload and decode the same image.
 */
const imagePreloadCache = new Map<
    string,
    Promise<void>
>();

/**
 * Normalize an array index so it always falls between:
 *
 * 0 and length - 1
 *
 * JavaScript's remainder operator may return a negative number,
 * so the second modulo operation normalizes negative values.
 */
function wrapIndex(
    index: number,
    length: number,
): number {
    if (length <= 0) {
        return 0;
    }

    return ((index % length) + length) % length;
}

/**
 * Download and decode an image before displaying it.
 *
 * This lets the currently visible image remain mounted until the
 * next image is ready, avoiding partially painted image frames.
 */
function preloadAndDecodeImage(
    source: string,
): Promise<void> {
    const cachedPromise =
        imagePreloadCache.get(source);

    if (cachedPromise) {
        return cachedPromise;
    }

    const preloadPromise = new Promise<void>(
        (resolve, reject) => {
            const image = new Image();

            image.decoding = "async";

            image.onload = async () => {
                try {
                    await image.decode();
                } catch {
                    /*
                     * Some browsers may reject decode() even though
                     * the image has loaded and can still be rendered.
                     */
                }

                resolve();
            };

            image.onerror = () => {
                reject(
                    new Error(
                        `Failed to load hero image: ${source}`,
                    ),
                );
            };

            image.src = source;
        },
    );

    imagePreloadCache.set(
        source,
        preloadPromise,
    );

    /*
     * Remove failed entries so a later navigation can try loading
     * the image again.
     */
    void preloadPromise.catch(() => {
        imagePreloadCache.delete(source);
    });

    return preloadPromise;
}

const heroControlButtonClassName = `
    grid size-10 cursor-pointer
    place-items-center rounded-full
    border border-white/20
    bg-black/30 text-white
    backdrop-blur-md
    transition duration-200
    hover:border-primary-900
    hover:bg-primary-900
    hover:text-neutral-900
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-primary-900
    disabled:cursor-wait
    disabled:opacity-50
    sm:size-12
`;

interface HeroLoadingOverlayProps {
    visible: boolean;
}

function HeroLoadingOverlay({
    visible,
}: HeroLoadingOverlayProps) {
    if (!visible) {
        return null;
    }

    return (
        <div
            aria-hidden="true"
            className="
                skeleton-shimmer
                absolute inset-0 -z-20
                overflow-hidden
                bg-white/[0.04]
            "
        />
    );
}

function HeroFallbackImage() {
    return (
        <img
            src={unavailableImg}
            alt=""
            aria-hidden="true"
            loading="eager"
            className="
                absolute inset-0 -z-30
                h-full w-full
                object-cover object-center
            "
        />
    );
}

interface HeroSectionImageProps {
    heroImages: HeroImage[];
}

function HeroSectionImage({
    heroImages,
}: HeroSectionImageProps) {
    const [currentIndex, setCurrentIndex] =
        useState(0);

    /*
     * The previous image remains behind the new image while the
     * new image fades in.
     */
    const [previousImage, setPreviousImage] =
        useState<HeroImage | null>(null);

    const [isImageReady, setIsImageReady] =
        useState(false);

    const [isChangingImage, setIsChangingImage] =
        useState(false);

    const [hasImageError, setHasImageError] =
        useState(false);

    /*
     * Used to ignore an outdated asynchronous navigation request
     * if the component unmounts or a newer request replaces it.
     */
    const navigationRequestRef = useRef(0);

    const imageCount = heroImages.length;

    const currentImage =
        heroImages[currentIndex] ??
        heroImages[0];

    /*
     * Invalidate any active asynchronous navigation when this
     * component unmounts.
     */
    useEffect(() => {
        return () => {
            navigationRequestRef.current += 1;
        };
    }, []);

    /*
     * Preload the images most likely to be requested next.
     *
     * Only the adjacent images are preloaded instead of all images,
     * which avoids downloading every large hero image immediately.
     */
    useEffect(() => {
        if (imageCount <= 1) {
            return;
        }

        const previousIndex = wrapIndex(
            currentIndex - 1,
            imageCount,
        );

        const nextIndex = wrapIndex(
            currentIndex + 1,
            imageCount,
        );

        const adjacentSources = new Set([
            heroImages[previousIndex].url,
            heroImages[nextIndex].url,
        ]);

        adjacentSources.forEach((source) => {
            void preloadAndDecodeImage(
                source,
            ).catch(() => {
                /*
                 * Adjacent preloading is only an optimization.
                 * A failed preload should not break the carousel.
                 */
            });
        });
    }, [
        currentIndex,
        heroImages,
        imageCount,
    ]);

    const showImage = useCallback(
        async (targetIndex: number) => {
            if (
                imageCount <= 1 ||
                isChangingImage
            ) {
                return;
            }

            const safeIndex = wrapIndex(
                targetIndex,
                imageCount,
            );

            if (safeIndex === currentIndex) {
                return;
            }

            const targetImage =
                heroImages[safeIndex];

            const requestId =
                ++navigationRequestRef.current;

            setIsChangingImage(true);

            try {
                /*
                 * Keep the current image visible while the target
                 * image downloads and decodes.
                 */
                await preloadAndDecodeImage(
                    targetImage.url,
                );

                if (
                    requestId !==
                    navigationRequestRef.current
                ) {
                    return;
                }

                /*
                 * Save the current image so it can remain behind
                 * the incoming image during the crossfade.
                 */
                setPreviousImage(currentImage);
                setIsImageReady(false);
                setHasImageError(false);
                setCurrentIndex(safeIndex);
            } catch (error) {
                /*
                 * Do not replace a working image with a broken one.
                 * The existing image remains visible.
                 */
                if (ENV.DEBUG) {
                    console.error(
                        "Unable to change hero image:",
                        error,
                    );
                }
            } finally {
                if (
                    requestId ===
                    navigationRequestRef.current
                ) {
                    setIsChangingImage(false);
                }
            }
        },
        [
            currentImage,
            currentIndex,
            heroImages,
            imageCount,
            isChangingImage,
        ],
    );

    const nextImage = useCallback(() => {
        void showImage(currentIndex + 1);
    }, [
        currentIndex,
        showImage,
    ]);

    const prevImage = useCallback(() => {
        void showImage(currentIndex - 1);
    }, [
        currentIndex,
        showImage,
    ]);

    /*
     * Automatically advance the slideshow.
     *
     * The interval is skipped when:
     * - there is only one image;
     * - the user prefers reduced motion;
     * - the browser tab is currently hidden.
     */
    useEffect(() => {
        if (imageCount <= 1) {
            return;
        }

        const prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

        if (prefersReducedMotion) {
            return;
        }

        const intervalId = window.setInterval(
            () => {
                if (!document.hidden) {
                    nextImage();
                }
            },
            HERO_AUTOPLAY_DELAY,
        );

        return () => {
            window.clearInterval(intervalId);
        };
    }, [
        imageCount,
        nextImage,
    ]);

    return (
        <>
            {/* Always retain a safe background behind the carousel. */}
            <HeroFallbackImage />

            {previousImage && (
                <img
                    src={previousImage.url}
                    alt=""
                    aria-hidden="true"
                    className="
                        absolute inset-0 -z-30
                        h-full w-full
                        object-cover object-center
                    "
                />
            )}

            <img
                key={`${currentImage.id}-${currentImage.url}`}
                src={currentImage.url}
                alt=""
                aria-hidden="true"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                onLoad={() => {
                    setHasImageError(false);
                    setIsImageReady(true);
                }}
                onError={() => {
                    setHasImageError(true);
                    setIsImageReady(true);
                }}
                onTransitionEnd={(event) => {
                    if (
                        event.propertyName ===
                        "opacity" &&
                        isImageReady
                    ) {
                        setPreviousImage(null);
                    }
                }}
                className={[
                    `
                        absolute inset-0 -z-30
                        h-full w-full
                        object-cover object-center
                        transition-[opacity,transform]
                        duration-700 ease-out
                        motion-reduce:transition-none
                    `,
                    isImageReady &&
                        !hasImageError
                        ? `
                            scale-100
                            opacity-100
                        `
                        : `
                            scale-[1.015]
                            opacity-0
                        `,
                ].join(" ")}
            />

            <HeroLoadingOverlay
                visible={
                    isChangingImage ||
                    !isImageReady
                }
            />

            {imageCount > 1 && (
                <div
                    className="
                        pointer-events-none
                        absolute inset-x-0
                        bottom-0 z-50
                    "
                >
                    <div
                        className="
                            mx-auto flex w-full
                            max-w-[90rem]
                            items-center justify-end
                            px-5 pb-6
                            sm:px-8 sm:pb-8
                            lg:px-12 lg:pb-16
                        "
                    >
                        <div
                            role="group"
                            aria-label="Hero slide controls"
                            className="
                                pointer-events-auto
                                flex items-center gap-2
                            "
                        >
                            <button
                                type="button"
                                aria-label="Show previous background"
                                disabled={isChangingImage}
                                onClick={prevImage}
                                className={
                                    heroControlButtonClassName
                                }
                            >
                                <FiChevronLeft
                                    aria-hidden="true"
                                    className="
                                        text-xl
                                        sm:text-2xl
                                    "
                                />
                            </button>

                            <button
                                type="button"
                                aria-label="Show next background"
                                disabled={isChangingImage}
                                onClick={nextImage}
                                className={
                                    heroControlButtonClassName
                                }
                            >
                                <FiChevronRight
                                    aria-hidden="true"
                                    className="
                                        text-xl
                                        sm:text-2xl
                                    "
                                />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

interface HeroSectionImagesProps {
    heroImagesQuery: HeroImagesQuery;
}

export default function HeroSectionImages({
    heroImagesQuery
}: HeroSectionImagesProps) {
    const hasHeroImages =
        heroImagesQuery.status === "success" &&
        heroImagesQuery.data.length > 0;


    return (
        <>
            {/*
             * Keep the fallback image mounted behind every state so
             * the hero never exposes an empty background.
             */}
            {!hasHeroImages && (
                <HeroFallbackImage />
            )}

            {hasHeroImages && (
                <>
                    <HeroSectionImage
                        heroImages={
                            heroImagesQuery.data
                        }
                    />
                </>
            )}

            {/*
             * Query loading gets a shimmer. Error and empty states
             * simply retain the fallback background.
             */}
            <HeroLoadingOverlay
                visible={
                    heroImagesQuery.status ===
                    "pending"
                }
            />

            {heroImagesQuery.status ===
                "error" && (
                    <span
                        role="status"
                        className="sr-only"
                    >
                        The hero background could not
                        be loaded.
                    </span>
                )}

            {/* Shared image overlays */}
            <div
                aria-hidden="true"
                className="
                    absolute inset-0 -z-20
                    bg-black/20
                "
            />

            <div
                aria-hidden="true"
                className="
                    absolute inset-0 -z-10
                    bg-gradient-to-r
                    from-black/85
                    via-black/40
                    to-black/55
                "
            />

            <div
                aria-hidden="true"
                className="
                    absolute inset-0 -z-10
                    bg-gradient-to-t
                    from-black/60
                    via-transparent
                    to-black/25
                "
            />
        </>
    );
}
