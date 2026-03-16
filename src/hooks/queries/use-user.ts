import { useQuery } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import {
    UserProfile,
    WalletBalance,
    ApiResponse
} from "@/constants/interface";

export const useWalletBalanceQuery = () => {
    return useQuery({
        queryKey: ["wallet-balance"],
        queryFn: async () => {
            const response = await httpService.get<ApiResponse<WalletBalance>>(
                API_CONFIG.ENDPOINTS.USERS.WALLET
            );
            return response.data.data;
        },
    });
};

export const useUserProfileQuery = () => {
    return useQuery({
        queryKey: ["user-profile"],
        queryFn: async () => {
            const response = await httpService.get<UserProfile>(
                API_CONFIG.ENDPOINTS.USERS.PROFILE
            );
            return response.data;
        },
    });
};
