import {
    createMockResponse,
    type ApiResponseInterface,
} from '@services/api.service';
import type { LoginCredentials, LoginResponse } from '../types';

const MOCK_ADMIN_EMAIL = 'admin@rccgmznl.com';
const MOCK_ADMIN_PASSWORD = '24052014';

const MOCK_LOGIN_DELAY = 800;

export const mockLogin = async (
    credentials: LoginCredentials
): Promise<ApiResponseInterface<LoginResponse | null>> => {
    await new Promise((resolve) => {
        setTimeout(resolve, MOCK_LOGIN_DELAY);
    });

    const isValidCredentials =
        credentials.email.trim().toLowerCase() === MOCK_ADMIN_EMAIL &&
        credentials.password === MOCK_ADMIN_PASSWORD;

    if (!isValidCredentials) {
        return createMockResponse({
            success: false,
            data: null,
            status_code: 401,
        });
    }

    const loginResponse: LoginResponse = {
        access: 'mock-admin-access-token',
    };

    return createMockResponse({
        success: true,
        data: loginResponse,
        status_code: 200,
    });
};
