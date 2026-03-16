import { useQuery } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import {
    ApiResponse,
    Draw,
    DrawWinner,
    PaginatedResponse
} from "@/constants/interface";

export const useUpcomingDrawQuery = () => {
    return useQuery({
        queryKey: ["upcoming-draw"],
        queryFn: async () => {
            const response = await httpService.get<ApiResponse<Draw>>(
                API_CONFIG.ENDPOINTS.DRAWS.UPCOMING
            );
            return response.data.data;
        },
    });
};

export const useDrawHistoryQuery = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["draw-history", page, limit],
        queryFn: async () => {
            const response = await httpService.get<PaginatedResponse<Draw>>(
                API_CONFIG.ENDPOINTS.DRAWS.LIST,
                { params: { page, limit } }
            );
            return response.data;
        },
    });
};

export const useDrawWinnersQuery = (drawId: string) => {
    return useQuery({
        queryKey: ["draw-winners", drawId],
        queryFn: async () => {
            const response = await httpService.get<ApiResponse<DrawWinner[]>>(
                API_CONFIG.ENDPOINTS.DRAWS.WINNERS(drawId)
            );
            return response.data.data;
        },
        enabled: !!drawId,
    });
};
