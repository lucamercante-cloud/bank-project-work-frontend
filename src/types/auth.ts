import type { ContoCorrente } from './conto';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: ContoCorrente;
    token: string;
}