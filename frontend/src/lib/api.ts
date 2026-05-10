import { useAuthStore } from "@/stores/auth.store";
import { ROUTES } from "@/lib/constants";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export class ApiError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  method: HttpMethod,
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, headers, body, ...rest } = options;

  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
  }

  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...rest,
  };

  if (body && !(body instanceof FormData)) {
    config.body = JSON.stringify(body);
  } else if (body instanceof FormData) {
    config.body = body;
    // Let the browser set the content-type for FormData
    if (config.headers && "Content-Type" in config.headers) {
      delete (config.headers as any)["Content-Type"];
    }
  }

  const response = await fetch(url.toString(), config);

  if (response.status === 401) {
    if (typeof window !== "undefined") {
      // Use the global store to clear auth state properly
      useAuthStore.getState().logout();
      window.location.href = ROUTES.LOGIN;
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(response.status, errorData.message || "An error occurred", errorData);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) => 
    request<T>("GET", endpoint, options),
  
  post: <T>(endpoint: string, body?: any, options?: RequestOptions) => 
    request<T>("POST", endpoint, { ...options, body }),
  
  put: <T>(endpoint: string, body?: any, options?: RequestOptions) => 
    request<T>("PUT", endpoint, { ...options, body }),
  
  patch: <T>(endpoint: string, body?: any, options?: RequestOptions) => 
    request<T>("PATCH", endpoint, { ...options, body }),
  
  delete: <T>(endpoint: string, options?: RequestOptions) => 
    request<T>("DELETE", endpoint, options),
};
