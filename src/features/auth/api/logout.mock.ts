import {
    createMockResponse,
    type ApiResponseInterface,
} from '@services/api.service';

export const mockLogout = async (): Promise<ApiResponseInterface<null>> => {
    return createMockResponse({
        success: true,
        data: null,
        status_code: 200,
    });
};
