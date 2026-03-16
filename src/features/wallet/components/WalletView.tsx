"use client";

import { motion } from "framer-motion";
import { Wallet, Landmark, TrendingUp, History } from "lucide-react";
import { WithdrawalForm } from "./WithdrawalForm";
import { WithdrawalHistory } from "./WithdrawalHistory";
import { Card, CardContent } from "@/components/ui/card";
import { WalletBalance, Withdrawal } from "@/constants/interface";

interface WalletViewProps {
    wallet?: WalletBalance;
    isWalletLoading: boolean;
    withdrawalHistory: Withdrawal[];
    isHistoryLoading: boolean;
    withdrawalPending: boolean;
    onWithdrawalRequest: (values: { amount: number }) => void;
}

export function WalletView({
    wallet,
    isWalletLoading,
    withdrawalHistory,
    isHistoryLoading,
    withdrawalPending,
    onWithdrawalRequest
}: WalletViewProps) {
    return (
        <div className="space-y-12 pb-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-500/20 text-purple-400 p-2 rounded-xl border border-purple-500/20 shadow-lg">
                        <Landmark className="w-5 h-5 fill-current" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-500/80">Vault & Settlements</span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-white lg:text-6xl drop-shadow-2xl">
                    Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Center</span>
                </h1>
                <p className="text-zinc-500 font-medium mt-4 max-w-xl text-lg leading-relaxed">
                    Monitor your yields, track referral commissions, and initialize secure payouts to your designated bank account.
                </p>
            </motion.div>

            {/* Primary Balance Section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-1 bg-zinc-950/40 border-white/5 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-12 transition-transform">
                        <Wallet className="w-32 h-32 text-emerald-400" />
                    </div>
                    <CardContent className="p-10 relative z-10 text-center lg:text-left">
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Withdrawable Balance</p>
                        <h2 className="text-6xl font-black text-white italic tracking-tighter mb-4">
                            ₹{wallet?.balance || 0}
                        </h2>
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-400">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">₹{wallet?.commission_earned || 0} from referrals</span>
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-2">
                    <WithdrawalForm
                        onSubmit={onWithdrawalRequest}
                        isLoading={withdrawalPending}
                        maxBalance={wallet?.balance || 0}
                    />
                </div>
            </section>

            {/* History Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-center gap-3">
                        <History className="w-5 h-5 text-zinc-400" />
                        <h2 className="text-2xl font-black text-white tracking-tight uppercase">Settlement History</h2>
                        <div className="h-px flex-1 bg-white/5 ml-4" />
                    </div>
                    <WithdrawalHistory withdrawals={withdrawalHistory} isLoading={isHistoryLoading} />
                </div>

                <div className="lg:col-span-4 space-y-6">
                    {/* Summary bits or help sections */}
                    <Card className="bg-emerald-500/5 border border-emerald-500/10">
                        <CardContent className="p-6 space-y-4">
                            <h4 className="text-sm font-black text-white uppercase tracking-widest">Settlement Summary</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-zinc-500 font-bold uppercase">Total Earned</span>
                                    <span className="text-white font-black italic">₹{wallet?.total_balance || 0}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-zinc-500 font-bold uppercase">Total Withdrawn</span>
                                    <span className="text-zinc-400 font-black italic">₹{wallet?.withdrawn || 0}</span>
                                </div>
                                <div className="h-px bg-white/5 my-2" />
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-zinc-500 font-bold uppercase">Processing Fee</span>
                                    <span className="text-emerald-400 font-black italic">₹0.00</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
