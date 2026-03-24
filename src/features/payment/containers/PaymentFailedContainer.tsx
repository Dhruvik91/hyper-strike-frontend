"use client";

import { useSearchParams } from "next/navigation";
import { PaymentFailedView } from "../components/PaymentFailedView";

export function PaymentFailedContainer() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId") || "";
    const error = searchParams.get("error") || "Payment processing failed";

    return (
        <PaymentFailedView
            orderId={orderId}
            error={error}
        />
    );
}
