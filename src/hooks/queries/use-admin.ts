import { useQuery } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import { PaginatedResponse, Referral, Commission, AdminDashboardResponse, UserProfile } from "@/constants/interface";

export const useAdminDashboardQuery = () => {
    return useQuery({
        queryKey: ["admin-dashboard"],
        queryFn: async () => {
            const response = await httpService.get<AdminDashboardResponse>(
                API_CONFIG.ENDPOINTS.ADMIN.DASHBOARD
            );
            return response.data;
        },
    });
};

export const useAdminReferralsQuery = () => {
    return useQuery({
        queryKey: ["admin-referrals"],
        queryFn: async () => {
            const response = await httpService.get<UserProfile[]>(
                API_CONFIG.ENDPOINTS.ADMIN.REFERRALS,
            );
            return response.data;
        },
    });
};

export const useAdminCommissionsQuery = (page = 1, limit = 100) => {
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
