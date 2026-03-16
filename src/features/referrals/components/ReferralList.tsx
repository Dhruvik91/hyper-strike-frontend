"use client";

import { Referral } from "@/constants/interface";
import { motion } from "framer-motion";
import { User, Calendar, ExternalLink } from "lucide-react";

interface ReferralListProps {
    referrals: Referral[];
    isLoading?: boolean;
}

export function ReferralList({ referrals, isLoading }: ReferralListProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 rounded-2xl bg-zinc-900/40 border border-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    if (referrals.length === 0) {
        return (
            <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-white/5">
                <User className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg">No referrals yet</h3>
                <p className="text-zinc-500 text-sm mt-1">Start sharing your link to build your empire!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {referrals.map((referral, index) => (
                <motion.div
                    key={referral.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-zinc-950/40 border border-white/5 p-4 rounded-2xl hover:bg-white/[0.03] transition-all group flex items-center justify-between"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-blue-400 font-bold">
                            {referral.referred_user?.first_name?.[0] || 'U'}
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                                {referral.referred_user?.first_name || 'Anonymous Striker'}
                            </h4>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-2 mt-0.5">
                                <Calendar className="w-3 h-3" />
                                Joined {new Date(referral.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-0.5">Contribution</p>
                            <p className="text-xs font-black text-emerald-400 italic">+₹250</p>
                        </div>
                        <button className="p-2 rounded-lg bg-white/5 text-zinc-500 hover:text-white transition-colors">
                            <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
