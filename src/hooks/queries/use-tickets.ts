import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import {
    Ticket,
    PaginatedResponse,
    TicketPriceResponse,
    PurchaseTicketsRequest,
    PurchaseTicketsResponse,
    PaymentStatusResponse
} from "@/constants/interface";
import { toast } from "sonner";

export const useTicketPriceQuery = () => {
    return useQuery({
        queryKey: ["ticket-price"],
        queryFn: async () => {
            const response = await httpService.get<TicketPriceResponse>(
                API_CONFIG.ENDPOINTS.TICKETS.PRICE
            );
            return response.data;
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
        mutationFn: async (data: PurchaseTicketsRequest) => {
            const response = await httpService.post<PurchaseTicketsResponse>(
                API_CONFIG.ENDPOINTS.TICKETS.PURCHASE,
                data
            );
            return response.data;
        },
        onSuccess: (data) => {
            toast.success("Redirecting to payment gateway...");
            if (data?.payment_url) {
                window.location.href = data.payment_url;
            }
            queryClient.invalidateQueries({ queryKey: ["my-tickets"] });
            queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to initiate purchase");
        },
    });
};

export const useTicketByIdQuery = (ticketId: string) => {
    return useQuery({
        queryKey: ["ticket", ticketId],
        queryFn: async () => {
            const response = await httpService.get<Ticket>(
                API_CONFIG.ENDPOINTS.TICKETS.BY_ID(ticketId)
            );
            return response.data;
        },
        enabled: !!ticketId,
    });
};

export const usePaymentStatusQuery = (orderId: string) => {
    return useQuery({
        queryKey: ["payment-status", orderId],
        queryFn: async () => {
            const response = await httpService.get<PaymentStatusResponse>(
                API_CONFIG.ENDPOINTS.PAYMENTS.STATUS(orderId)
            );
            return response.data;
        },
        enabled: !!orderId,
        refetchInterval: (query) => {
            const data = query.state.data;
            if (data?.status === "success" || data?.status === "failed") {
                return false;
            }
            return 3000;
        },
    });
};

export const useMockPaymentSuccessMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (orderId: string) => {
            const response = await httpService.get<{ message: string }>(
                API_CONFIG.ENDPOINTS.PAYMENTS.MOCK_SUCCESS(orderId)
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Payment successful! Tickets generated.");
            queryClient.invalidateQueries({ queryKey: ["my-tickets"] });
            queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Payment simulation failed");
        },
    });
};
