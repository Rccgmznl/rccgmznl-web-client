import { ENV } from "@config/env";
import type { LoginCredentials, LoginResponse } from "../types";
import type { ApiResponseInterface } from "@services/api.service";

export const apiLogin = async (
    credentials: LoginCredentials
): Promise<ApiResponseInterface<LoginResponse | undefined | null>> => {
    const url = `${ENV.BASE_URL}/auth/login/`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    return await response.json();
}
