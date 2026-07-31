import type { useHeroImages } from "../hooks/useHeroImages";

export interface HeroImage {
    id: number;
    url: string;
    alt_text?: string;
}

export type HeroImagesQuery = ReturnType<typeof useHeroImages>;
