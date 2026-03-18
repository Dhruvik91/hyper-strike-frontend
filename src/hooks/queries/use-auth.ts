import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import {
    ApiResponse,
    UserProfile
} from "@/constants/interface";
import {
    LoginInput,
    RegisterInput,
    SendOtpInput,
    VerifyOtpInput
} from "@/lib/validations/auth";
import { toast } from "sonner";

type TokenPair = {
    access_token: string;
    refresh_token: string;
};

const ACCESS_TOKEN_KEY = "hyperstrike_access_token";
const REFRESH_TOKEN_KEY = "hyperstrike_refresh_token";

const setTokenPair = (pair: TokenPair) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(ACCESS_TOKEN_KEY, pair.access_token);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, pair.refresh_token);
};

const clearTokens = () => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};

const getRefreshToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const useSendOtpMutation = () => {
    return useMutation({
        mutationFn: async (data: SendOtpInput) => {
            const response = await httpService.post<ApiResponse>(
                API_CONFIG.ENDPOINTS.AUTH.SEND_OTP,
                data
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("OTP sent to your WhatsApp number");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to send OTP");
        },
    });
};

export const useVerifyOtpMutation = () => {
    return useMutation({
        mutationFn: async (data: VerifyOtpInput) => {
            const response = await httpService.post<ApiResponse<boolean>>(
                API_CONFIG.ENDPOINTS.AUTH.VERIFY_OTP,
                data
            );
            return response.data;
        },
        onSuccess: (data) => {
            if (data) {
                toast.success("WhatsApp number verified");
            }
        },
        onError: (error: any) => {
            toast.error(error.message || "Invalid or expired OTP");
        },
    });
};

export const useRegisterMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: RegisterInput) => {
            const response = await httpService.post<TokenPair>(
                API_CONFIG.ENDPOINTS.AUTH.REGISTER,
                data
            );
            return response.data;
        },
        onSuccess: (data) => {
            setTokenPair(data);
            toast.success("Registration successful");
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Registration failed");
        },
    });
};

export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: LoginInput) => {
            const response = await httpService.post<TokenPair>(
                API_CONFIG.ENDPOINTS.AUTH.LOGIN,
                data
            );
            return response.data;
        },
        onSuccess: (data) => {
            setTokenPair(data);
            toast.success("Login successful");
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Login failed");
        },
    });
};

export const useLogoutMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const refreshToken = getRefreshToken();
            const response = await httpService.post<ApiResponse>(
                API_CONFIG.ENDPOINTS.AUTH.LOGOUT,
                { refresh_token: refreshToken }
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Logged out successfully");
            clearTokens();
            queryClient.clear();
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        },
    });
};

export const useProfileQuery = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const response = await httpService.get<UserProfile>(
                API_CONFIG.ENDPOINTS.AUTH.ME
            );
            return response.data;
        },
        retry: false,
    });
};
