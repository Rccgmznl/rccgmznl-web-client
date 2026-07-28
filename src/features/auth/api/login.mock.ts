import { createMockResponse, type ApiResponseInterface } from "@services/api.service";
import type { LoginCredentials, LoginResponse } from "../types";

export const mockLogin = async (
    credentials: LoginCredentials
): Promise<ApiResponseInterface<LoginResponse | null>> => {
    void credentials;

    return createMockResponse({
        success: true,
        data: null,
        status_code: 200,
    });
}
