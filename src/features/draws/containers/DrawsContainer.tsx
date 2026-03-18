"use client";

import { useUpcomingDrawQuery, useDrawHistoryQuery } from "@/hooks/queries/use-draws";
import { DrawsView } from "../components/DrawsView";

export function DrawsContainer() {
    const { data: upcomingDraw, isLoading: isUpcomingLoading } = useUpcomingDrawQuery();
    const { data: historyResponse, isLoading: isHistoryLoading } = useDrawHistoryQuery(1, 12);

    return (
        <DrawsView
            upcomingDraw={upcomingDraw ?? undefined}
            historyDraws={historyResponse?.items || []}
            isUpcomingLoading={isUpcomingLoading}
            isHistoryLoading={isHistoryLoading}
        />
    );
}
