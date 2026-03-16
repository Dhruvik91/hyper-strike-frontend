import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import {
    AuthResponse,
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
            const response = await httpService.post<AuthResponse>(
                API_CONFIG.ENDPOINTS.AUTH.REGISTER,
                data
            );
            return response.data;
        },
        onSuccess: () => {
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
            const response = await httpService.post<AuthResponse>(
                API_CONFIG.ENDPOINTS.AUTH.LOGIN,
                data
            );
            return response.data;
        },
        onSuccess: () => {
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
            // Backend expects RefreshTokenDto for logout, but if we use cookies, 
            // the backend might handle it. Let's send an empty object for now.
            const response = await httpService.post<ApiResponse>(
                API_CONFIG.ENDPOINTS.AUTH.LOGOUT,
                {}
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Logged out successfully");
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
