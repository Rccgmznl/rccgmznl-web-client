import {
    createMockResponse,
    type ApiResponseInterface,
} from '@services/api.service';
import type { User } from '../types';

export const mockGetUser = async (): Promise<
    ApiResponseInterface<User | null>
> => {
    return createMockResponse({
        success: true,
        data: {
            id: 0,
            email: 'user@example.com',
            firstName: 'Lekan',
            lastName: 'HOD',
            isActive: true,
            createdAt: '2026-07-28T03:46:19.930Z',
            updatedAt: '2026-07-28T03:46:19.931Z',
            isAdmin: true,
        },
        status_code: 200,
    });
};
