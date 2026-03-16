"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, TrendingUp, ShieldCheck, Activity } from "lucide-react";
import { useAdminStatsQuery } from "@/hooks/queries/use-admin";
import { StatsGrid } from "@/features/dashboard/components/StatsGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
    const { data: stats, isLoading } = useAdminStatsQuery();

    const adminStats = [
        {
            title: "Network Volume",
            value: stats?.total_users?.toString() || "0",
            icon: Users,
            trend: "Total platform users",
            color: "text-blue-400"
        },
        {
            title: "Direct Influence",
            value: stats?.managed_referrals?.toString() || "0",
            icon: TrendingUp,
            trend: "Users under your ID",
            color: "text-emerald-400"
        },
        {
            title: "Revenue Yield",
            value: `₹${stats?.total_commissions || 0}`,
            icon: DollarSign,
            trend: "Aggregated commissions",
            color: "text-purple-400"
        },
        {
            title: "Growth Index",
            value: "+12%",
            icon: Activity,
            trend: "Weekly network growth",
            color: "text-amber-400"
        }
    ];

    return (
        <div className="space-y-10 pb-16">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-blue-500/20 text-blue-400 p-1.5 rounded-md">
                            <ShieldCheck className="w-4 h-4 fill-current" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/80">Admin Authority</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-2xl">
                        System Overseer
                    </h1>
                    <p className="text-zinc-500 font-medium mt-1">
                        Analyzing network metrics and commission distributions.
                    </p>
                </motion.div>
            </div>

            {/* Stats Section */}
            <StatsGrid stats={adminStats} />

            {/* Admin Specific Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="text-lg font-black text-white uppercase tracking-tight">Recent Commissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-zinc-500 text-sm italic py-10 text-center">
                            Real-time commission feed incoming...
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="text-lg font-black text-white uppercase tracking-tight">Top Performers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-zinc-500 text-sm italic py-10 text-center">
                            Analyzing affiliate performance metrics...
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
