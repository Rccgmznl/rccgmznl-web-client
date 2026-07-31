import { createMockResponse, type ApiResponseInterface } from "@services/api.service";
import type { HeroImage } from "../types";

const IMAGES: HeroImage[] = [
    {
        id: 1,
        url: "/images/hero/IMG_6498.jpg",
        alt_text: "Welcome to our church"
    },
    {
        id: 2,
        url: "/images/hero/IMG_0194.jpg",
        alt_text: "Welcome to our church"
    },
    {
        id: 3,
        url: "/images/hero/IMG_0247.jpg",
        alt_text: "Welcome to our church"
    },
    {
        id: 4,
        url: "/images/hero/IMG_0364.jpg",
        alt_text: "Welcome to our church"
    },
    {
        id: 5,
        url: "/images/hero/IMG_9882.jpg",
        alt_text: "Welcome to our church"
    },
    {
        id: 6,
        url: "/images/hero/IMG_9955.jpg",
        alt_text: "Welcome to our church"
    },
    {
        id: 7,
        url: "/images/hero/IMG_9956.jpg",
        alt_text: "Sunday worship"
    },
]

export const mockGetHeroImages = (): Promise<ApiResponseInterface<HeroImage[] | null | undefined>> => {
    return createMockResponse({
        success: true,
        data: IMAGES,
        status_code: 200
    });
}

export const mockUpdateHeroImages = (
    payload: HeroImage[]
): Promise<ApiResponseInterface<HeroImage[] | null | undefined>> => {
    return createMockResponse({
        success: true,
        data: payload,
        status_code: 200
    });
}
