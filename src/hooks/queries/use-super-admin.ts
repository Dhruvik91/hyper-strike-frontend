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
