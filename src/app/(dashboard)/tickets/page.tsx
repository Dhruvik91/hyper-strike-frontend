import { Metadata } from "next";
import { TicketsContainer } from "@/features/tickets/containers/TicketsContainer";

export const metadata: Metadata = {
    title: "My Tickets | HyperStrike",
    description: "View and manage your active lucky draw entries and quickly acquire new ones for upcoming strikes.",
};

export default function TicketsPage() {
    return <TicketsContainer />;
}
