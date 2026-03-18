"use client";

import { motion } from "framer-motion";
import { Landmark, ShieldAlert, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewWithdrawalList } from "@/features/admin/components/ReviewWithdrawalList";

import { Withdrawal } from "@/constants/interface";

interface WithdrawalsViewProps {
    withdrawals: Withdrawal[];
    isLoading: boolean;
    totalPendingAmount: number;
    pendingCurrency?: string;
    onReview: (id: string, status: 'APPROVED' | 'REJECTED', reason?: string) => void;
}

export function WithdrawalsView({
    withdrawals,
    isLoading,
    totalPendingAmount,
    pendingCurrency,
    onReview
}: WithdrawalsViewProps) {
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
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-500/80">Audit & Settlements</span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-white lg:text-6xl drop-shadow-2xl">
                    Payout <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-500">Governance</span>
                </h1>
                <p className="text-zinc-500 font-medium mt-4 max-w-xl text-lg leading-relaxed">
                    Oversee and authorize platform-wide withdrawals. Ensure financial integrity by auditing request details before final strike settlement.
                </p>
            </motion.div>

            {/* Analytics Banner */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Queue Depth</p>
                                <h3 className="text-3xl font-black text-white italic">{withdrawals?.length || 0} Requests</h3>
                            </div>
                            <div className="bg-purple-500/10 text-purple-400 p-3 rounded-2xl">
                                <Clock className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 bg-gradient-to-br from-emerald-600/10 via-zinc-950/40 to-black border-white/10 backdrop-blur-xl">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Aggregated Settlement Value</p>
                                <h3 className="text-3xl font-black text-emerald-400 italic">{totalPendingAmount.toLocaleString()} {pendingCurrency || ''}</h3>
                            </div>
                            <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-2xl">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Main Review List */}
            <section className="space-y-8">
                <div className="flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5 text-purple-500" />
                    <h2 className="text-2xl font-black text-white tracking-tight uppercase">Authorization Queue</h2>
                    <div className="h-px flex-1 bg-white/5 ml-4" />
                </div>
                <ReviewWithdrawalList
                    withdrawals={withdrawals}
                    isLoading={isLoading}
                    onReview={onReview}
                />
            </section>
        </div>
    );
}
