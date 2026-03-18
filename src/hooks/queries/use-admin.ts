import { useQuery } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import { PaginatedResponse, Referral, Commission } from "@/constants/interface";

export const useAdminStatsQuery = () => {
    return useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const response = await httpService.get<{
                total_referrals: number;
                commissions: Commission[];
                total_commissions: number;
            }>(
                API_CONFIG.ENDPOINTS.ADMIN.DASHBOARD
            );
            return {
                total_users: response.data.total_referrals,
                managed_referrals: response.data.total_referrals,
                total_commissions: response.data.total_commissions,
            };
        },
    });
};

export const useAdminReferralsQuery = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["admin-referrals", page, limit],
        queryFn: async () => {
            const response = await httpService.get<Referral[]>(
                API_CONFIG.ENDPOINTS.ADMIN.REFERRALS,
            );
            return {
                items: response.data,
                total: response.data.length,
                page,
                limit,
            } satisfies PaginatedResponse<Referral>;
        },
    });
};

export const useAdminCommissionsQuery = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["admin-commissions", page, limit],
        queryFn: async () => {
            const response = await httpService.get<{ items: Commission[]; total: number; page: number; limit: number }>(
                API_CONFIG.ENDPOINTS.ADMIN.COMMISSIONS,
            );
            return response.data;
        },
    });
};
