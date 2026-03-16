import { useQuery, useMutation } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import {
    ApiResponse,
    Referral,
    PaginatedResponse
} from "@/constants/interface";
import { toast } from "sonner";

export const useMyReferralLinkQuery = () => {
    return useQuery({
        queryKey: ["referral-link"],
        queryFn: async () => {
            const response = await httpService.get<ApiResponse<string>>(
                API_CONFIG.ENDPOINTS.REFERRALS.MY_LINK
            );
            return response.data.data;
        },
    });
};

export const useValidateReferralMutation = () => {
    return useMutation({
        mutationFn: async (code: string) => {
            const response = await httpService.post<ApiResponse<void>>(
                API_CONFIG.ENDPOINTS.REFERRALS.VALIDATE(code)
            );
            return response.data.data;
        },
        onError: (error: any) => {
            toast.error(error.message || "Invalid referral code");
        },
    });
};

export const useMyReferralsQuery = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["my-referrals", page, limit],
        queryFn: async () => {
            const response = await httpService.get<PaginatedResponse<Referral>>(
                API_CONFIG.ENDPOINTS.USERS.REFERRALS,
                { params: { page, limit } }
            );
            return response.data;
        },
    });
};
