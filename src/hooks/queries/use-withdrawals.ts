import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import {
    Withdrawal,
    PaginatedResponse,
    WithdrawalRequest
} from "@/constants/interface";
import { toast } from "sonner";

export const useWithdrawalHistoryQuery = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["withdrawal-history", page, limit],
        queryFn: async () => {
            const response = await httpService.get<Withdrawal[]>(
                API_CONFIG.ENDPOINTS.WITHDRAWALS.MY_HISTORY
            );
            return {
                items: response.data,
                total: response.data.length,
                page,
                limit,
            } satisfies PaginatedResponse<Withdrawal>;
        },
    });
};

export const useRequestWithdrawalMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: WithdrawalRequest) => {
            const response = await httpService.post<Withdrawal>(
                API_CONFIG.ENDPOINTS.WITHDRAWALS.REQUEST,
                payload
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Withdrawal request submitted successfully");
            queryClient.invalidateQueries({ queryKey: ["withdrawal-history"] });
            queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to request withdrawal");
        },
    });
};
