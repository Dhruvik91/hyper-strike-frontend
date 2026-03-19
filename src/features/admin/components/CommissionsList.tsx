"use client";

import { Commission } from "@/constants/interface";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Clock } from "lucide-react";
import { format } from "date-fns";

interface CommissionsListProps {
    commissions: Commission[];
    isLoading?: boolean;
}

export function CommissionsList({ commissions, isLoading }: CommissionsListProps) {
    if (isLoading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 rounded-2xl bg-zinc-900/40 border border-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    if (commissions.length === 0) {
        return (
            <div className="text-center py-12 bg-zinc-900/20 rounded-2xl border border-white/5 border-dashed">
                <DollarSign className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                <h3 className="text-zinc-500 font-bold text-sm">No commissions yet</h3>
                <p className="text-zinc-600 text-xs mt-1">Earnings will appear here</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {commissions.map((commission, index) => (
                <motion.div
                    key={commission.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-zinc-950/40 border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/5 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
                            commission.status === 'PAID' 
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                                : commission.status === 'CANCELLED'
                                ? 'bg-red-500/10 border-red-500/20 text-red-400'
                                : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                        }`}>
                            {commission.status === 'PAID' ? (
                                <TrendingUp className="w-5 h-5" />
                            ) : (
                                <Clock className="w-5 h-5" />
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors">
                                {commission.amount_crypto} {commission.source_user?.first_name ? `from ${commission.source_user.first_name}` : 'USDT'}
                            </p>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                                {format(new Date(commission.created_at), "MMM dd, yyyy")}
                            </p>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-sm font-black text-white">₹{commission.amount_inr}</p>
                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                            commission.status === 'PAID' 
                                ? 'text-emerald-500' 
                                : commission.status === 'CANCELLED'
                                ? 'text-red-500'
                                : 'text-amber-500'
                        }`}>
                            {commission.status}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
