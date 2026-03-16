"use client";

import { useParams } from "next/navigation";
import { useDrawWinnersQuery } from "@/hooks/queries/use-draws";
import { DrawDetailsView } from "../components/DrawDetailsView";

export function DrawDetailsContainer() {
    const params = useParams();
    const drawId = params.id as string;
    const { data: winners, isLoading } = useDrawWinnersQuery(drawId);

    return (
        <DrawDetailsView
            drawId={drawId}
            winners={winners || []}
            isLoading={isLoading}
        />
    );
}
