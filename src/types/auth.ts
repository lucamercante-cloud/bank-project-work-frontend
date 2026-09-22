import type { ContoCorrente } from './conto';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: ContoCorrente;
    token: string;
}

export interface RegisterData {
    email: string;
    password: string;
    confermaPassword: string;
    nomeTitolare: string;
    cognomeTitolare: string;
}

export interface RegisterResponse {
    message: string;
}