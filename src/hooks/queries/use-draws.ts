import { useQuery } from "@tanstack/react-query";
import httpService from "@/lib/http-service";
import { API_CONFIG } from "@/constants/constants";
import {
    Draw,
    DrawWinner,
    PaginatedResponse
} from "@/constants/interface";

export const useUpcomingDrawQuery = () => {
    return useQuery({
        queryKey: ["upcoming-draw"],
        queryFn: async () => {
            const response = await httpService.get<Draw | null>(
                API_CONFIG.ENDPOINTS.DRAWS.UPCOMING
            );
            return response.data;
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
            const response = await httpService.get<DrawWinner[]>(
                API_CONFIG.ENDPOINTS.DRAWS.WINNERS(drawId)
            );
            return response.data;
        },
        enabled: !!drawId,
    });
};

export const useAllDrawsQuery = (page = 1, limit = 20) => {
    return useQuery({
        queryKey: ["all-draws", page, limit],
        queryFn: async () => {
            const response = await httpService.get<PaginatedResponse<Draw>>(
                API_CONFIG.ENDPOINTS.DRAWS.LIST,
                { params: { page, limit } }
            );
            return response.data;
        },
    });
};

export const useDrawDetailsQuery = (drawId: string, enabled = true) => {
    return useQuery({
        queryKey: ["draw-details", drawId],
        queryFn: async () => {
            const response = await httpService.get<Draw>(
                API_CONFIG.ENDPOINTS.DRAWS.BY_ID(drawId)
            );
            return response.data;
        },
        enabled: !!drawId && enabled,
    });
};

export const useDrawByIdQuery = useDrawDetailsQuery;
