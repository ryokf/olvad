import { AuthResponse, LoginRequest, RegisterRequest } from '@olvad/types';

const API_URL = 'http://localhost:4000/api';

export async function login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login gagal');
    }

    return response.json();
}

export async function register(
    data: RegisterRequest,
): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registrasi gagal');
    }

    return { message: 'User registered successfully' };
}
