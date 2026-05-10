import { useAuthStore } from "@/stores/auth.store";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const DEFAULT_TIMEOUT = 30000; // 30 seconds

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  timeout?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any,
    public name: string = "ApiError"
  ) {
    super(message);
    // Ensure the prototype chain is correct for instanceof checks
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Type guard to check if an error is an ApiError
 */
export const isApiError = (error: any): error is ApiError => {
  return error instanceof ApiError;
};

async function request<T>(
  method: HttpMethod,
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { params, headers, body, timeout = DEFAULT_TIMEOUT, ...rest } = options;

  const url = new URL(`${API_BASE_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const authState = useAuthStore.getState();
  const token = authState.accessToken;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    signal: controller.signal,
    ...rest,
  };

  if (body && !(body instanceof FormData)) {
    config.body = JSON.stringify(body);
  } else if (body instanceof FormData) {
    config.body = body;
    if (config.headers && "Content-Type" in config.headers) {
      delete (config.headers as any)["Content-Type"];
    }
  }

  try {
    const response = await fetch(url.toString(), config);
    clearTimeout(timeoutId);

    // Centralized 401 handling
    if (response.status === 401) {
      const isAuthEndpoint = url.pathname.includes('/auth/login') || url.pathname.includes('/auth/signup');
      
      if (!isAuthEndpoint) {
        // Trigger store logout which handles state and redirect via DashboardLayout
        // This is safe because it doesn't cause a hard refresh
        authState.logout();
        throw new ApiError(401, "Session expired. Please login again.");
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status, 
        errorData.message || `Error ${response.status}: ${response.statusText}`, 
        errorData
      );
    }

    if (response.status === 204) {
      return { success: true, message: "Success", data: {} as T };
    }

    const result = await response.json() as ApiResponse<T>;
    return result;
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new ApiError(408, "Request timed out");
    }
    
    if (isApiError(error)) {
      throw error;
    }

    throw new ApiError(0, error.message || "Network error");
  }
}

/**
 * Centralized API client
 */
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
    
  /**
   * Helper to execute a request and return only the data part
   */
  unwrap: async <T>(promise: Promise<ApiResponse<T>>): Promise<T> => {
    const response = await promise;
    return response.data;
  }
};
