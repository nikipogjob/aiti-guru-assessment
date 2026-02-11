import { http } from '../../../shared/api/http';

export interface LoginRequest {
    username: string,
    password: string,
};

export interface LoginResponse {
    accessToken?: string,
};

export async function loginApi(data: LoginRequest): Promise<string> {
    const res = await http.post<LoginResponse>('/auth/login', data, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const token = res.data.accessToken;
    if (!token) {
        throw new Error('Token not found in response');
    }

    return token;
}

