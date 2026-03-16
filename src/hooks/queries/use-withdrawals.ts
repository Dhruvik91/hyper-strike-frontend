import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import {
    ApiResponse,
    Withdrawal,
    PaginatedResponse
} from "@/constants/interface";
import { toast } from "sonner";

export const useWithdrawalHistoryQuery = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["withdrawal-history", page, limit],
        queryFn: async () => {
            const response = await httpService.get<PaginatedResponse<Withdrawal>>(
                API_CONFIG.ENDPOINTS.WITHDRAWALS.MY_HISTORY,
                { params: { page, limit } }
            );
            return response.data;
        },
    });
};

export const useRequestWithdrawalMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (amount: number) => {
            const response = await httpService.post<ApiResponse<void>>(
                API_CONFIG.ENDPOINTS.WITHDRAWALS.REQUEST,
                { amount }
            );
            return response.data.data;
        },
        onSuccess: () => {
            toast.success("Withdrawal request submitted");
            queryClient.invalidateQueries({ queryKey: ["withdrawal-history"] });
            queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to request withdrawal");
        },
    });
};
