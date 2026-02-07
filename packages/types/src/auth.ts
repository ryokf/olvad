import { User } from './user';

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    photo?: string;
    address?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    user: Omit<User, 'password'>; // Data user tanpa password
}
