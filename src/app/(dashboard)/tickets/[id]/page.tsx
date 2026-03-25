import { Metadata } from "next";
import { TicketDetailContainer } from "@/features/tickets/containers/TicketDetailContainer";

export const metadata: Metadata = {
    title: "Ticket Details | HyperStrike",
    description: "View detailed information about your ticket entry.",
};

export default function TicketDetailPage({ params }: { params: { id: string } }) {
    return <TicketDetailContainer ticketId={params.id} />;
}
