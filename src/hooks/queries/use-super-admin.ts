import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import { PaginatedResponse, UserProfile, Withdrawal, PlatformConfig } from "@/constants/interface";

import { toast } from "sonner";

export const useSuperAdminUsersQuery = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["super-admin-users", page, limit],
        queryFn: async () => {
            const response = await httpService.get<PaginatedResponse<UserProfile>>(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.USERS,
                { params: { page, limit } }
            );
            return response.data;
        },
    });
};

export const useToggleUserStatusMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: { userId: string; is_active: boolean }) => {
            const response = await httpService.patch<UserProfile>(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.TOGGLE_USER(payload.userId),
                { is_active: payload.is_active },
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("User status updated");
            queryClient.invalidateQueries({ queryKey: ["super-admin-users"] });
        },
    });
};

export const usePendingWithdrawalsQuery = () => {
    return useQuery({
        queryKey: ["pending-withdrawals"],
        queryFn: async () => {
            const response = await httpService.get<PaginatedResponse<Withdrawal>>(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.PENDING_WITHDRAWALS
            );
            return response.data;
        },
    });
};

export const useReviewWithdrawalMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, action, rejection_reason }: { id: string; action: 'approve' | 'reject'; rejection_reason?: string }) => {
            const response = await httpService.post<Withdrawal>(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.REVIEW_WITHDRAWAL(id),
                { action, rejection_reason }
            );
            return response.data;
        },
        onSuccess: (_, variables) => {
            toast.success(`Withdrawal ${variables.action}d successfully`);
            queryClient.invalidateQueries({ queryKey: ["pending-withdrawals"] });
        },
    });
};

export const usePlatformConfigQuery = () => {
    return useQuery({
        queryKey: ["platform-config"],
        queryFn: async () => {
            const response = await httpService.get<PlatformConfig>(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.CONFIG
            );
            return response.data;
        },
    });
};

export const useUpdatePlatformConfigMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (config: Partial<PlatformConfig>) => {
            const response = await httpService.put<PlatformConfig>(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.CONFIG,
                config
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Platform configuration updated");
            queryClient.invalidateQueries({ queryKey: ["platform-config"] });
        },
    });
};

export const useFundUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userId, amount_inr }: { userId: string; amount_inr: number }) => {
            const response = await httpService.post<UserProfile>(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.FUND_USER(userId),
                { amount_inr }
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("User wallet funded successfully");
            queryClient.invalidateQueries({ queryKey: ["super-admin-users"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to fund user wallet");
        },
    });
};

export const useCreateAdminMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: { email: string; password: string; whatsapp_number: string }) => {
            const response = await httpService.post<UserProfile>(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.CREATE_ADMIN,
                data
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Admin account created successfully");
            queryClient.invalidateQueries({ queryKey: ["super-admin-users"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to create admin account");
        },
    });
};

export const useCreateDrawMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: { type: string; scheduled_at: string }) => {
            const response = await httpService.post(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.DRAWS,
                data
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Draw created successfully");
            queryClient.invalidateQueries({ queryKey: ["draws"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to create draw");
        },
    });
};

export const useSelectWinnersMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (drawId: string) => {
            const response = await httpService.post(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.SELECT_WINNERS(drawId)
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Winners selected successfully");
            queryClient.invalidateQueries({ queryKey: ["draws"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to select winners");
        },
    });
};

export const useSetWinnersMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ drawId, winners }: { drawId: string; winners: Array<{ user_id: string; ticket_id: string; win_type: string; prize_amount_inr: string }> }) => {
            const response = await httpService.post(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.SET_WINNERS(drawId),
                winners
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Winners assigned successfully");
            queryClient.invalidateQueries({ queryKey: ["draws"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to assign winners");
        },
    });
};
