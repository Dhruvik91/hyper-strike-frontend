import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { ApiResponse } from "@/constants/interface";
import { API_CONFIG } from "@/constants/constants";
import { toast } from "sonner";

class HttpService {
  private static instance: HttpService;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.baseUrl,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // With cookie-based JWT auth, the browser will attach cookies automatically.
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

        if (status === 401) {
          // Perform logout or redirect to login
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
