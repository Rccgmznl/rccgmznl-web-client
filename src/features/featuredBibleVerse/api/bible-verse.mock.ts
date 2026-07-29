import type { FeaturedBibleVerse } from '@features/featuredBibleVerse/types';
import {
    createMockResponse,
    type ApiResponseInterface,
} from '@services/api.service';

const DATA: FeaturedBibleVerse = {
    reference: 'Psalm 100:4',
    text: 'Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.',
};

export const mockGetFeaturedBibleVerse = async (): Promise<
    ApiResponseInterface<FeaturedBibleVerse | null>
> => {
    // return createMockResponse({
    //     success: false,
    //     errors: {"server error": ["Failed to fetch"]},
    //     status_code: 500,
    // });
    return createMockResponse({
        success: true,
        data: DATA,
        status_code: 200,
    });
};

export const mockUpdateFeaturedBibleVerse = async (
    payload: FeaturedBibleVerse
): Promise<ApiResponseInterface<FeaturedBibleVerse | null>> => {
    void payload;
    // return createMockResponse({
    //     success: false,
    //     errors: {"server error": ["Failed to fetch"]},
    //     status_code: 500,
    // });
    return createMockResponse({
        success: true,
        data: payload,
        status_code: 200,
    });
};
