import { useQuery, useMutation } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import { Payment } from "@/constants/interface";
import { toast } from "sonner";

export const usePaymentStatusQuery = (orderId: string, enabled = true) => {
    return useQuery({
        queryKey: ["payment-status", orderId],
        queryFn: async () => {
            const response = await httpService.get<Payment>(
                API_CONFIG.ENDPOINTS.PAYMENTS.STATUS(orderId)
            );
            return response.data;
        },
        enabled: enabled && !!orderId,
        refetchInterval: (query) => {
            const status = query.state.data?.status;
            if (status === 'COMPLETED' || status === 'FAILED') {
                return false;
            }
            return 3000;
        },
        retry: 3,
    });
};

export const useMockPaymentSuccessMutation = () => {
    return useMutation({
        mutationFn: async (orderId: string) => {
            const response = await httpService.get<{ message: string }>(
                API_CONFIG.ENDPOINTS.PAYMENTS.MOCK_SUCCESS(orderId)
            );
            return response.data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Payment simulated successfully");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to simulate payment");
        },
    });
};
