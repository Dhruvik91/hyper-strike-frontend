"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { StatsGrid } from "@/features/dashboard/components/StatsGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommissionsList } from "./CommissionsList";
import { Commission } from "@/constants/interface";

interface AdminDashboardViewProps {
    stats: any[];
    isLoading: boolean;
    commissions?: Commission[];
}

export function AdminDashboardView({
    stats,
    isLoading,
    commissions = []
}: AdminDashboardViewProps) {
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
            <StatsGrid stats={stats} />

            {/* Admin Specific Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="text-lg font-black text-white uppercase tracking-tight">Recent Commissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CommissionsList commissions={commissions} isLoading={isLoading} />
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
