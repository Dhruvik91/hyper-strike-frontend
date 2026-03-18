"use client";

import { usePendingWithdrawalsQuery, useReviewWithdrawalMutation } from "@/hooks/queries/use-super-admin";
import { WithdrawalsView } from "../components/WithdrawalsView";

export function WithdrawalsContainer() {
    const { data: withdrawals, isLoading } = usePendingWithdrawalsQuery();
    const reviewMutation = useReviewWithdrawalMutation();

    const handleReview = (id: string, status: 'APPROVED' | 'REJECTED', reason?: string) => {
        reviewMutation.mutate({
            id,
            action: status === 'APPROVED' ? 'approve' : 'reject',
            rejection_reason: reason,
        });
    };

    const totalPendingAmount = withdrawals?.items?.reduce((acc, curr) => acc + Number(curr.amount_requested), 0) || 0;
    const pendingCurrency = withdrawals?.items?.[0]?.crypto_currency;

    return (
        <WithdrawalsView
            withdrawals={withdrawals?.items || []}
            isLoading={isLoading}
            totalPendingAmount={totalPendingAmount}
            pendingCurrency={pendingCurrency}
            onReview={handleReview}
        />
    );
}
