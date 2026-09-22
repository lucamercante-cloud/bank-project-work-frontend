import { api } from "./api";
import type { LoginCredentials, LoginResponse, RegisterData, RegisterResponse } from "../types/auth";

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/login", credentials);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
}

export async function register(data: RegisterData): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/register", data);
  return response.data;
}

