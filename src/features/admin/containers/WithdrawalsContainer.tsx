"use client";

import { usePendingWithdrawalsQuery, useReviewWithdrawalMutation } from "@/hooks/queries/use-super-admin";
import { WithdrawalsView } from "../components/WithdrawalsView";

export function WithdrawalsContainer() {
    const { data: withdrawals, isLoading } = usePendingWithdrawalsQuery();
    const reviewMutation = useReviewWithdrawalMutation();

    const handleReview = (id: string, status: 'APPROVED' | 'REJECTED', reason?: string) => {
        reviewMutation.mutate({ id, status, rejection_reason: reason });
    };

    const totalPendingAmount = withdrawals?.reduce((acc, curr) => acc + Number(curr.amount_inr), 0) || 0;

    return (
        <WithdrawalsView
            withdrawals={withdrawals?.map(w => ({
                ...w,
                user: w.user || { whatsapp_number: 'N/A' } as any
            })) || []}
            isLoading={isLoading}
            totalPendingAmount={totalPendingAmount}
            onReview={handleReview}
        />
    );
}
