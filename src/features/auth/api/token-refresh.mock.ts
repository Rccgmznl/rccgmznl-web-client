import {
    createMockResponse,
    type ApiResponseInterface,
} from '@services/api.service';
import type { LoginResponse } from '../types';

export const mockTokenRefresh = async (): Promise<
    ApiResponseInterface<LoginResponse | null>
> => {
    // return createMockResponse({
    //     success: true,
    //     data: {
    //         access: 'adfadfasdf',
    //     },
    //     status_code: 200,
    // });
    return createMockResponse({
        success: false,
        errors: {
            server: ['Debug mode: yeah I want it to fail deal with itttttt'],
        },
        status_code: 500,
    });
};
