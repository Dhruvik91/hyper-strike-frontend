import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { ApiResponse } from "@/constants/interface";
import { API_CONFIG } from "@/constants/constants";
import { toast } from "sonner";

type TokenPair = {
  access_token: string;
  refresh_token: string;
};

const ACCESS_TOKEN_KEY = "hyperstrike_access_token";
const REFRESH_TOKEN_KEY = "hyperstrike_refresh_token";

const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
};

const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
};

const setTokenPair = (pair: TokenPair): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, pair.access_token);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, pair.refresh_token);
};

const clearTokens = (): void => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};

class HttpService {
  private static instance: HttpService;
  private axiosInstance: AxiosInstance;
  private refreshPromise: Promise<TokenPair> | null = null;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.baseUrl,
      withCredentials: false,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();
        if (token) {
          config.headers = config.headers ?? ({} as any);
          (config.headers as any).Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        const envelope = response.data as ApiResponse<unknown>;
        if (
          envelope &&
          typeof envelope === 'object' &&
          'statusCode' in envelope &&
          'success' in envelope
        ) {
          if (!envelope.success) {
            const messages = Array.isArray(envelope.message)
              ? envelope.message
              : [envelope.message ?? envelope.error ?? 'Request failed'];
            const error = new Error(messages[0] ?? 'Request failed');
            (error as any).response = { status: envelope.statusCode, data: envelope };
            throw error;
          }
          return {
            ...response,
            data: envelope.data,
          } as AxiosResponse;
        }
        return response;
      },
      async (error: AxiosError) => {
        const status = error.response?.status;

        const originalRequest = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined;
        const isRefreshCall = originalRequest?.url === API_CONFIG.ENDPOINTS.AUTH.REFRESH;

        if (status === 401 && originalRequest && !originalRequest._retry && !isRefreshCall) {
          originalRequest._retry = true;
          const refreshToken = getRefreshToken();

          if (!refreshToken) {
            clearTokens();
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            return Promise.reject(error);
          }

          try {
            const newPair = await this.refreshTokens(refreshToken);
            setTokenPair(newPair);

            originalRequest.headers = originalRequest.headers ?? {};
            (originalRequest.headers as any).Authorization = `Bearer ${newPair.access_token}`;
            return this.axiosInstance.request(originalRequest);
          } catch (_refreshError) {
            clearTokens();
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            return Promise.reject(error);
          }
        }

        if (status === 401) {
          clearTokens();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }

        if (status === 403) {
          // Redirect to unauthorized page or show message
          if (typeof window !== 'undefined') {
            // Optional: window.location.href = '/unauthorized';
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshTokens(refreshToken: string): Promise<TokenPair> {
    if (!this.refreshPromise) {
      this.refreshPromise = (async () => {
        const response = await axios.post<ApiResponse<TokenPair>>(
          `${API_CONFIG.baseUrl}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`,
          { refresh_token: refreshToken },
          { headers: { "Content-Type": "application/json" } },
        );

        const envelope = response.data;
        if (
          envelope &&
          typeof envelope === 'object' &&
          'success' in envelope &&
          'statusCode' in envelope
        ) {
          if (!envelope.success || !envelope.data) {
            throw new Error(
              Array.isArray(envelope.message) ? envelope.message[0] : envelope.message,
            );
          }
          return envelope.data;
        }

        // Fallback if backend ever stops wrapping (shouldn't happen)
        return response.data as unknown as TokenPair;
      })().finally(() => {
        this.refreshPromise = null;
      });
    }

    return this.refreshPromise;
  }

  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return response;
    } catch (error: unknown) {
      return this.handleError(error);
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: "GET", url });
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: "POST", url, data });
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: "PUT", url, data });
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: "PATCH", url, data });
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: "DELETE", url });
  }

  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message || "An unexpected error occurred";
      toast.error(message);
      throw error;
    }
    toast.error("An unexpected error occurred");
    throw error;
  }
}

export default HttpService.getInstance(); 
