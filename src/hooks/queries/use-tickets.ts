import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import {
    ApiResponse,
    Ticket,
    PaginatedResponse
} from "@/constants/interface";
import { toast } from "sonner";

export const useTicketPriceQuery = () => {
    return useQuery({
        queryKey: ["ticket-price"],
        queryFn: async () => {
            const response = await httpService.get<ApiResponse<{ price_inr: number }>>(
                API_CONFIG.ENDPOINTS.TICKETS.PRICE
            );
            return response.data.data;
        },
    });
};

export const useMyTicketsQuery = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["my-tickets", page, limit],
        queryFn: async () => {
            const response = await httpService.get<PaginatedResponse<Ticket>>(
                API_CONFIG.ENDPOINTS.TICKETS.MY_TICKETS,
                { params: { page, limit } }
            );
            return response.data;
        },
    });
};

export const usePurchaseTicketMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (quantity: number) => {
            const response = await httpService.post<ApiResponse<{ payment_url: string }>>(
                API_CONFIG.ENDPOINTS.TICKETS.PURCHASE,
                { quantity }
            );
            return response.data;
        },
        onSuccess: (data: any) => {
            toast.success("Ticket purchase initiated");
            // Redirect to payment gateway or show success
            if (data?.payment_url) {
                window.location.href = data.payment_url;
            }
            queryClient.invalidateQueries({ queryKey: ["my-tickets"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to purchase tickets");
        },
    });
};
