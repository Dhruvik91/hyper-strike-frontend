import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import { 
    PaginatedResponse, 
    UserProfile, 
    Withdrawal, 
    PlatformConfig,
    AdminUser,
    CreateAdminAutoRequest,
    CreateAdminAutoResponse,
    CreateAdminManualRequest,
    FundUserWalletRequest,
    FundUserWalletResponse,
    CreateDrawRequest,
    SetWinnersRequest,
    ReviewWithdrawalRequest,
    UpdateConfigRequest,
    Draw
} from "@/constants/interface";

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
        mutationFn: async ({ id, action, rejection_reason }: ReviewWithdrawalRequest & { id: string }) => {
            const response = await httpService.post<Withdrawal>(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.REVIEW_WITHDRAWAL(id),
                { action, rejection_reason } satisfies ReviewWithdrawalRequest
            );
            return response.data;
        },
        onSuccess: (_, variables) => {
            toast.success(`Withdrawal ${variables.action}d successfully`);
            queryClient.invalidateQueries({ queryKey: ["pending-withdrawals"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to review withdrawal");
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
        mutationFn: async (config: UpdateConfigRequest) => {
            const response = await httpService.put<PlatformConfig>(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.CONFIG,
                config
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Platform configuration updated successfully");
            queryClient.invalidateQueries({ queryKey: ["platform-config"] });
            queryClient.invalidateQueries({ queryKey: ["ticket-price"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update platform configuration");
        },
    });
};

export const useSuperAdminAdminsQuery = (page = 1, limit = 20, search = "", startDate = "", endDate = "") => {
    return useQuery({
        queryKey: ["super-admin-admins", page, limit, search, startDate, endDate],
        queryFn: async () => {
            const response = await httpService.get<PaginatedResponse<AdminUser>>(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.ADMINS,
                { params: { page, limit, search, startDate, endDate } }
            );
            return response.data;
        },
    });
};

export const useFundUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userId, amount_inr }: { userId: string; amount_inr: number }) => {
            const response = await httpService.post<FundUserWalletResponse>(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.FUND_USER(userId),
                { amount_inr } satisfies FundUserWalletRequest
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

export const useCreateAdminManualMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreateAdminManualRequest) => {
            const response = await httpService.post<UserProfile>(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.CREATE_ADMIN,
                data
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Admin account created successfully");
            queryClient.invalidateQueries({ queryKey: ["super-admin-admins"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to create admin account");
        },
    });
};

export const useCreateAdminAutoMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreateAdminAutoRequest) => {
            const response = await httpService.post<CreateAdminAutoResponse>(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.CREATE_ADMIN_AUTO,
                data
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Admin account created with auto-generated credentials");
            queryClient.invalidateQueries({ queryKey: ["super-admin-admins"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to create admin account");
        },
    });
};

export const useCreateDrawMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreateDrawRequest) => {
            const response = await httpService.post<Draw>(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.DRAWS,
                data
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Draw created successfully");
            queryClient.invalidateQueries({ queryKey: ["all-draws"] });
            queryClient.invalidateQueries({ queryKey: ["upcoming-draw"] });
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
            queryClient.invalidateQueries({ queryKey: ["all-draws"] });
            queryClient.invalidateQueries({ queryKey: ["draw-winners"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to select winners");
        },
    });
};

export const useSetWinnersMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ drawId, winner_ticket_ids }: { drawId: string; winner_ticket_ids: string[] }) => {
            const response = await httpService.post(
                API_CONFIG.ENDPOINTS.SUPER_ADMIN.SET_WINNERS(drawId),
                { winner_ticket_ids } satisfies SetWinnersRequest
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Winners assigned successfully");
            queryClient.invalidateQueries({ queryKey: ["all-draws"] });
            queryClient.invalidateQueries({ queryKey: ["draw-winners"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to assign winners");
        },
    });
};
