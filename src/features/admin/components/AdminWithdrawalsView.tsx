"use client";

import { motion } from "framer-motion";
import { Wallet, DollarSign } from "lucide-react";
import { WalletBalance, Withdrawal } from "@/constants/interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { WithdrawalRequestForm } from "@/features/withdrawals/withdrawal-request-form";

interface AdminWithdrawalsViewProps {
    wallet?: WalletBalance;
    withdrawals: Withdrawal[];
    isLoading: boolean;
    isRequesting: boolean;
    onRequestWithdrawal: (values: { amount: number; crypto_currency: string; wallet_address: string }) => void;
}

export function AdminWithdrawalsView({
    wallet,
    withdrawals,
    isLoading,
    isRequesting,
    onRequestWithdrawal,
}: AdminWithdrawalsViewProps) {
    if (isLoading) {
        return (
            <div className="space-y-8">
                <h1 className="text-4xl font-black text-white">Withdrawals</h1>
                <TableSkeleton rows={5} />
            </div>
        );
    }

    const walletBalanceINR = wallet ? parseFloat(wallet.wallet_balance_inr) : 0;

    return (
        <div className="space-y-8 pb-20">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-black text-white mb-2">Withdrawals</h1>
                <p className="text-zinc-500">Request and track your withdrawal requests</p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Request Withdrawal</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <WithdrawalRequestForm
                                availableBalance={walletBalanceINR}
                                cryptoCurrency={wallet?.crypto_currency || "USDT"}
                                isSubmitting={isRequesting}
                                onSubmit={onRequestWithdrawal}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Withdrawal History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {withdrawals.length === 0 ? (
                                <EmptyState
                                    icon={DollarSign}
                                    title="No withdrawals yet"
                                    description="Request your first withdrawal to see it here"
                                />
                            ) : (
                                <div className="space-y-3">
                                    {withdrawals.map((withdrawal) => (
                                        <div
                                            key={withdrawal.id}
                                            className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                                        >
                                            <div className="flex-1">
                                                <p className="font-semibold">
                                                    {withdrawal.amount || withdrawal.amount_requested} {withdrawal.crypto_currency}
                                                </p>
                                                <p className="text-sm text-muted-foreground truncate">
                                                    {withdrawal.wallet_address}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {new Date(withdrawal.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span
                                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                        withdrawal.status === "APPROVED"
                                                            ? "bg-green-500/20 text-green-700"
                                                            : withdrawal.status === "REJECTED"
                                                            ? "bg-red-500/20 text-red-700"
                                                            : "bg-yellow-500/20 text-yellow-700"
                                                    }`}
                                                >
                                                    {withdrawal.status}
                                                </span>
                                                {withdrawal.rejection_reason && (
                                                    <p className="text-xs text-red-400 mt-1">
                                                        {withdrawal.rejection_reason}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Available Balance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-emerald-500/20 p-3 rounded-lg">
                                    <Wallet className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-2xl font-black text-white">
                                        ₹{walletBalanceINR.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {wallet?.wallet_balance_crypto || "0"} {wallet?.crypto_currency || "USDT"}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
