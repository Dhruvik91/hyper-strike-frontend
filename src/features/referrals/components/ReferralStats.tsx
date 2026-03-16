"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, DollarSign, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ReferralStatsProps {
    totalReferrals: number;
    activeReferrals: number;
    commissionEarned: number;
}

export function ReferralStats({ totalReferrals, activeReferrals, commissionEarned }: ReferralStatsProps) {
    const stats = [
        {
            label: "Total Network",
            value: totalReferrals.toString(),
            icon: Users,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
        },
        {
            label: "Active Nodes",
            value: activeReferrals.toString(),
            icon: TrendingUp,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
        },
        {
            label: "Total Yield",
            value: `₹${commissionEarned}`,
            icon: DollarSign,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
        },
        {
            label: "Current Rank",
            value: "Elite",
            icon: Award,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl overflow-hidden group">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <h3 className="text-2xl font-black text-white tracking-tight">{stat.value}</h3>
                                </div>
                                <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
