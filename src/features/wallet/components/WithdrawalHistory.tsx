"use client";

import { Withdrawal } from "@/constants/interface";
import { motion } from "framer-motion";
import { History, CheckCircle2, Clock, XCircle } from "lucide-react";
import { format } from "date-fns";

interface WithdrawalHistoryProps {
    withdrawals: Withdrawal[];
    isLoading?: boolean;
}

export function WithdrawalHistory({ withdrawals, isLoading }: WithdrawalHistoryProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 rounded-2xl bg-zinc-900/40 border border-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    if (withdrawals.length === 0) {
        return (
            <div className="text-center py-16 bg-zinc-900/20 rounded-3xl border border-white/5 border-dashed">
                <History className="w-10 h-10 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-zinc-500 font-bold text-sm">No payout history yet</h3>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {withdrawals.map((withdrawal, index) => (
                <motion.div
                    key={withdrawal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-zinc-950/40 border border-white/5 p-4 rounded-2xl flex items-center justify-between group"
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${withdrawal.status === 'APPROVED' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                withdrawal.status === 'REJECTED' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                                    'bg-amber-500/10 border-amber-500/20 text-amber-400'
                            }`}>
                            {withdrawal.status === 'APPROVED' ? <CheckCircle2 className="w-5 h-5" /> :
                                withdrawal.status === 'REJECTED' ? <XCircle className="w-5 h-5" /> :
                                    <Clock className="w-5 h-5" />}
                        </div>
                        <div>
                            <p className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors">₹{withdrawal.amount_inr}</p>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                                {format(new Date(withdrawal.created_at), "MMM dd, yyyy")}
                            </p>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${withdrawal.status === 'APPROVED' ? 'text-emerald-500' :
                                withdrawal.status === 'REJECTED' ? 'text-red-500' :
                                    'text-amber-500'
                            }`}>
                            {withdrawal.status}
                        </p>
                        {withdrawal.status === 'REJECTED' && (
                            <p className="text-[9px] text-zinc-600 font-medium italic mt-0.5 max-w-[120px] truncate">
                                {withdrawal.rejection_reason || 'Verification failed'}
                            </p>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
