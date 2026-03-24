"use client";

import { useWithdrawalHistoryQuery, useRequestWithdrawalMutation } from "@/hooks/queries/use-withdrawals";
import { useWalletBalanceQuery } from "@/hooks/queries/use-user";
import { AdminWithdrawalsView } from "../components/AdminWithdrawalsView";

export function AdminWithdrawalsContainer() {
    const { data: wallet } = useWalletBalanceQuery();
    const { data: withdrawalsData, isLoading } = useWithdrawalHistoryQuery(1, 20);
    const withdrawalMutation = useRequestWithdrawalMutation();

    const handleWithdrawalRequest = (values: { amount: number; crypto_currency: string; wallet_address: string }) => {
        withdrawalMutation.mutate(values);
    };

    return (
        <AdminWithdrawalsView
            wallet={wallet}
            withdrawals={withdrawalsData?.items || []}
            isLoading={isLoading}
            isRequesting={withdrawalMutation.isPending}
            onRequestWithdrawal={handleWithdrawalRequest}
        />
    );
}
