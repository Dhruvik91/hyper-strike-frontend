import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import {
    UserProfile,
    WalletBalance,
} from "@/constants/interface";
import { toast } from "sonner";

export const useWalletBalanceQuery = () => {
    return useQuery({
        queryKey: ["wallet-balance"],
        queryFn: async () => {
            const response = await httpService.get<WalletBalance>(
                API_CONFIG.ENDPOINTS.USERS.WALLET
            );
            return response.data;
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

export const useUserReferralsQuery = () => {
    return useQuery({
        queryKey: ["user-referrals"],
        queryFn: async () => {
            const response = await httpService.get<UserProfile[]>(
                API_CONFIG.ENDPOINTS.USERS.REFERRALS
            );
            return response.data;
        },
    });
};

export const useUpdateProfileMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Partial<UserProfile>) => {
            const response = await httpService.put<UserProfile>(
                API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE,
                data
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update profile");
        },
    });
};
