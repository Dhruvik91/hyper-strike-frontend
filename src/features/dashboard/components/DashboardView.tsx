"use client";

import { motion } from "framer-motion";
import {
    Ticket as TicketIcon,
    Copy,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsGrid } from "./StatsGrid";
import { RecentActivity } from "./RecentActivity";
import { MegaDrawCountdown } from "./MegaDrawCountdown";
import { UserProfile } from "@/constants/interface";

interface DashboardViewProps {
    user?: UserProfile;
    referralLink?: string;
    ticketsTotal: number;
    stats: any[];
    recentActivity: any[];
    onCopyReferral: () => void;
}

export function DashboardView({
    user,
    referralLink,
    ticketsTotal,
    stats,
    recentActivity,
    onCopyReferral
}: DashboardViewProps) {
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
                        <div className="bg-emerald-500/20 text-emerald-400 p-1.5 rounded-md">
                            <Zap className="w-4 h-4 fill-current" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/80">Active Session</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-2xl">
                        Command Center
                    </h1>
                    <p className="text-zinc-500 font-medium mt-1">
                        Welcome back, <span className="text-white">{user?.first_name || 'Striker'}</span>. Tracking your stats in real-time.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-wrap gap-3 w-full lg:w-auto"
                >
                    <Button
                        variant="outline"
                        onClick={onCopyReferral}
                        disabled={!referralLink}
                        className="flex-1 lg:flex-none border-white/10 bg-white/[0.02] text-zinc-300 hover:text-white hover:bg-white/10 h-12 rounded-xl px-6 font-bold"
                    >
                        <Copy className="w-4 h-4 mr-2" />
                        Refer Link
                    </Button>
                    <Button className="flex-1 lg:flex-none bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black h-12 rounded-xl px-8 shadow-[0_0_20px_rgba(16,185,129,0.3)] border-0">
                        <TicketIcon className="w-4 h-4 mr-2" />
                        Launch Tickets
                    </Button>
                </motion.div>
            </div>

            {/* Stats Section */}
            <StatsGrid stats={stats} />

            {/* Complex Layout Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <MegaDrawCountdown ticketCount={ticketsTotal} />
                </div>
                <div className="lg:col-span-4">
                    <RecentActivity activities={recentActivity} />
                </div>
            </div>
        </div>
    );
}
