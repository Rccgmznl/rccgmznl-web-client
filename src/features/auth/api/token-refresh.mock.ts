import { createMockResponse, type ApiResponseInterface } from "@services/api.service";
import type { LoginResponse } from "../types";

export const mockTokenRefresh = async (): Promise<ApiResponseInterface<LoginResponse | null>> => {
    return createMockResponse({
        success: true,
        data: {
            access: "adfadfasdf",
        },
        status_code: 200,
    });
}
