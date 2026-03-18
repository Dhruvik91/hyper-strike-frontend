"use client";

import { useState } from "react";
import { useMyTicketsQuery, useTicketPriceQuery, usePurchaseTicketMutation } from "@/hooks/queries/use-tickets";
import { TicketsView } from "../components/TicketsView";

export function TicketsContainer() {
    const { data: ticketsResponse, isLoading: isTicketsLoading } = useMyTicketsQuery(1, 12);
    const { data: ticketPrice } = useTicketPriceQuery();
    const purchaseMutation = usePurchaseTicketMutation();
    const [quantity, setQuantity] = useState(1);

    const handlePurchase = () => {
        purchaseMutation.mutate(quantity);
    };

    return (
        <TicketsView
            tickets={ticketsResponse?.items || []}
            totalTickets={ticketsResponse?.total || 0}
            isTicketsLoading={isTicketsLoading}
            ticketPrice={Number(ticketPrice?.price_inr) || 500}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onPurchase={handlePurchase}
            isPurchasing={purchaseMutation.isPending}
        />
    );
}
