import { useQuery } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import { ApiResponse, PaginatedResponse, Referral, Commission } from "@/constants/interface";

export const useAdminStatsQuery = () => {
    return useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const response = await httpService.get<ApiResponse<{
                total_users: number;
                managed_referrals: number;
                total_commissions: number;
            }>>(
                API_CONFIG.ENDPOINTS.ADMIN.DASHBOARD
            );
            return response.data.data;
        },
    });
};

export const useAdminReferralsQuery = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["admin-referrals", page, limit],
        queryFn: async () => {
            const response = await httpService.get<PaginatedResponse<Referral>>(
                API_CONFIG.ENDPOINTS.ADMIN.REFERRALS,
                { params: { page, limit } }
            );
            return response.data;
        },
    });
};

export const useAdminCommissionsQuery = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["admin-commissions", page, limit],
        queryFn: async () => {
            const response = await httpService.get<PaginatedResponse<Commission>>(
                API_CONFIG.ENDPOINTS.ADMIN.COMMISSIONS,
                { params: { page, limit } }
            );
            return response.data;
        },
    });
};
