"use client";

import { useWalletBalanceQuery } from "@/hooks/queries/use-user";
import { useWithdrawalHistoryQuery, useRequestWithdrawalMutation } from "@/hooks/queries/use-withdrawals";
import { WalletView } from "../components/WalletView";

export function WalletContainer() {
    const { data: wallet, isLoading: isWalletLoading } = useWalletBalanceQuery();
    const { data: withdrawalHistory, isLoading: isHistoryLoading } = useWithdrawalHistoryQuery(1, 10);
    const withdrawalMutation = useRequestWithdrawalMutation();

    const handleWithdrawalRequest = (values: { amount: number; crypto_currency: string; wallet_address: string }) => {
        withdrawalMutation.mutate(values);
    };

    return (
        <WalletView
            wallet={wallet}
            isWalletLoading={isWalletLoading}
            withdrawalHistory={withdrawalHistory?.items || []}
            isHistoryLoading={isHistoryLoading}
            withdrawalPending={withdrawalMutation.isPending}
            onWithdrawalRequest={handleWithdrawalRequest}
        />
    );
}
