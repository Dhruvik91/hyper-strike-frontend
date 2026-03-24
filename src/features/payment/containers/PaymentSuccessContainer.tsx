"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { usePaymentStatusQuery } from "@/hooks/queries/use-tickets";
import { PaymentSuccessView } from "../components/PaymentSuccessView";

export function PaymentSuccessContainer() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId") || "";
    
    const { data: paymentStatus, isLoading, refetch } = usePaymentStatusQuery(orderId);

    useEffect(() => {
        if (orderId) {
            const interval = setInterval(() => {
                refetch();
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [orderId, refetch]);

    return (
        <PaymentSuccessView
            orderId={orderId}
            paymentStatus={paymentStatus}
            isLoading={isLoading}
        />
    );
}
