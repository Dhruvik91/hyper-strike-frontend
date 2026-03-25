"use client";

import { useWalletBalanceQuery } from "@/hooks/queries/use-user";
import { useWithdrawalHistoryQuery, useRequestWithdrawalMutation } from "@/hooks/queries/use-withdrawals";
import { WithdrawalsView } from "../components/WithdrawalsView";

export function WithdrawalsContainer() {
    const { data: wallet, isLoading: isWalletLoading } = useWalletBalanceQuery();
    const { data: withdrawalHistory, isLoading: isHistoryLoading } = useWithdrawalHistoryQuery(1, 20);
    const withdrawalMutation = useRequestWithdrawalMutation();

    const handleWithdrawalRequest = (values: { amount: number; crypto_currency: string; wallet_address: string }) => {
        withdrawalMutation.mutate(values);
    };

    return (
        <WithdrawalsView
            wallet={wallet}
            isWalletLoading={isWalletLoading}
            withdrawalHistory={withdrawalHistory?.items || []}
            isHistoryLoading={isHistoryLoading}
            withdrawalPending={withdrawalMutation.isPending}
            onWithdrawalRequest={handleWithdrawalRequest}
        />
    );
}
