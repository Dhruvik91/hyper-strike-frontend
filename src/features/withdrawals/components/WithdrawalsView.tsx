"use client";

import { motion } from "framer-motion";
import { Landmark, TrendingUp, History, AlertCircle, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { WalletBalance, Withdrawal } from "@/constants/interface";
import { WithdrawalRequestForm } from "../withdrawal-request-form";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface WithdrawalsViewProps {
    wallet?: WalletBalance;
    isWalletLoading: boolean;
    withdrawalHistory: Withdrawal[];
    isHistoryLoading: boolean;
    withdrawalPending: boolean;
    onWithdrawalRequest?: (values: { amount: number; crypto_currency: string; wallet_address: string }) => void;
}

export function WithdrawalsView({
    wallet,
    isWalletLoading,
    withdrawalHistory,
    isHistoryLoading,
    withdrawalPending,
    onWithdrawalRequest
}: WithdrawalsViewProps) {
    const walletBalanceINR = wallet ? parseFloat(wallet.wallet_balance_inr) : 0;
    const walletBalanceCrypto = wallet ? parseFloat(wallet.wallet_balance_crypto) : 0;

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'APPROVED':
                return <CheckCircle className="w-4 h-4 text-emerald-400" />;
            case 'REJECTED':
                return <XCircle className="w-4 h-4 text-red-400" />;
            case 'PENDING':
                return <Clock className="w-4 h-4 text-amber-400" />;
            default:
                return <AlertCircle className="w-4 h-4 text-zinc-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'APPROVED':
                return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            case 'REJECTED':
                return 'text-red-400 bg-red-500/10 border-red-500/20';
            case 'PENDING':
                return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
            default:
                return 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20';
        }
    };

    return (
        <div className="space-y-8 pb-20">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-500/20 text-purple-400 p-2 rounded-xl border border-purple-500/20 shadow-lg">
                        <Landmark className="w-5 h-5 fill-current" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-500/80">Financial Management</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white lg:text-6xl drop-shadow-2xl">
                    Withdrawal <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Center</span>
                </h1>
                <p className="text-zinc-500 font-medium mt-4 max-w-2xl text-base md:text-lg leading-relaxed">
                    Request settlements and track your withdrawal history. All requests are reviewed within 24-48 hours.
                </p>
            </motion.div>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:rotate-12 transition-transform">
                        <Landmark className="w-32 h-32 text-purple-400" />
                    </div>
                    <CardContent className="p-6 md:p-8 relative z-10">
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Available Balance</p>
                        {isWalletLoading ? (
                            <Skeleton className="h-12 w-32 mb-4" />
                        ) : (
                            <>
                                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
                                    ₹{walletBalanceINR.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                                </h2>
                                <div className="flex items-center gap-2 text-purple-400">
                                    <TrendingUp className="w-4 h-4" />
                                    <span className="text-xs font-bold">
                                        {walletBalanceCrypto.toFixed(4)} {wallet?.crypto_currency || "USDT"}
                                    </span>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                <div className="lg:col-span-2">
                    <WithdrawalRequestForm />
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <History className="w-5 h-5 text-zinc-400" />
                    <h2 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase">Withdrawal History</h2>
                    <div className="h-px flex-1 bg-white/5 ml-4" />
                </div>

                {isHistoryLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="bg-zinc-950/40 border-white/5">
                                <CardContent className="p-6">
                                    <Skeleton className="h-6 w-full mb-2" />
                                    <Skeleton className="h-4 w-3/4" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : withdrawalHistory.length === 0 ? (
                    <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl">
                        <CardContent className="p-12 text-center">
                            <AlertCircle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                            <p className="text-zinc-500 font-medium">No withdrawal requests yet</p>
                            <p className="text-zinc-600 text-sm mt-2">Your withdrawal history will appear here</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {withdrawalHistory.map((withdrawal) => (
                            <motion.div
                                key={withdrawal.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl hover:border-white/10 transition-colors">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div className="space-y-2 flex-1">
                                                <div className="flex items-center gap-3">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getStatusColor(withdrawal.status)} flex items-center gap-2`}>
                                                        {getStatusIcon(withdrawal.status)}
                                                        {withdrawal.status}
                                                    </span>
                                                    <span className="text-xs text-zinc-500 font-medium">
                                                        {format(new Date(withdrawal.created_at), "MMM dd, yyyy 'at' hh:mm a")}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                                    <p className="text-2xl font-black text-white tracking-tight">
                                                        {withdrawal.amount || withdrawal.amount_requested} {withdrawal.crypto_currency}
                                                    </p>
                                                    <p className="text-sm text-zinc-500 font-mono break-all">
                                                        {withdrawal.wallet_address.slice(0, 10)}...{withdrawal.wallet_address.slice(-8)}
                                                    </p>
                                                </div>
                                                {withdrawal.status === 'REJECTED' && withdrawal.rejection_reason && (
                                                    <div className="flex items-start gap-2 mt-2 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                                                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                                        <p className="text-sm text-red-400 font-medium">{withdrawal.rejection_reason}</p>
                                                    </div>
                                                )}
                                                {withdrawal.status === 'APPROVED' && withdrawal.reviewed_at && (
                                                    <p className="text-xs text-emerald-400 font-medium">
                                                        Approved on {format(new Date(withdrawal.reviewed_at), "MMM dd, yyyy")}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
