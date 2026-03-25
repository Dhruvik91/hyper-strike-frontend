"use client";

import { useParams } from "next/navigation";
import { useDrawWinnersQuery, useDrawByIdQuery } from "@/hooks/queries/use-draws";
import { DrawDetailsView } from "../components/DrawDetailsView";

export function DrawDetailsContainer() {
    const params = useParams();
    const drawId = params.id as string;
    const { data: draw, isLoading: isDrawLoading } = useDrawByIdQuery(drawId);
    const { data: winners, isLoading: isWinnersLoading } = useDrawWinnersQuery(drawId);

    return (
        <DrawDetailsView
            draw={draw}
            winners={winners || []}
            isLoading={isDrawLoading || isWinnersLoading}
        />
    );
}
