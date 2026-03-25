"use client";

import { useTicketByIdQuery } from "@/hooks/queries/use-tickets";
import { useDrawByIdQuery } from "@/hooks/queries/use-draws";
import { TicketDetailView } from "../components/TicketDetailView";

interface TicketDetailContainerProps {
    ticketId: string;
}

export function TicketDetailContainer({ ticketId }: TicketDetailContainerProps) {
    const { data: ticket, isLoading: isTicketLoading } = useTicketByIdQuery(ticketId);
    const { data: draw, isLoading: isDrawLoading } = useDrawByIdQuery(ticket?.draw_id || "", !!ticket?.draw_id);

    return (
        <TicketDetailView
            ticket={ticket}
            draw={draw}
            isLoading={isTicketLoading || isDrawLoading}
        />
    );
}
