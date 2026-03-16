"use client";

import { motion } from "framer-motion";
import { Users, ShieldAlert, Cpu, Gavel, Settings, RefreshCcw } from "lucide-react";
import { useSuperAdminUsersQuery, useToggleUserStatusMutation } from "@/hooks/queries/use-super-admin";
import { StatsGrid } from "@/features/dashboard/components/StatsGrid";
import { UserTable } from "@/features/admin/components/UserTable";
import { Button } from "@/components/ui/button";

export default function SuperAdminDashboardPage() {
    const { data: usersResponse, isLoading: isUsersLoading } = useSuperAdminUsersQuery(1, 10);
    const toggleMutation = useToggleUserStatusMutation();

    const platformStats = [
        {
            title: "Active Strikers",
            value: usersResponse?.total?.toString() || "0",
            icon: Users,
            trend: "Aggregated user base",
            color: "text-blue-400"
        },
        {
            title: "System Integrity",
            value: "99.9%",
            icon: Cpu,
            trend: "Uptime and security",
            color: "text-emerald-400"
        },
        {
            title: "Pending Payouts",
            value: "₹12,450",
            icon: RefreshCcw,
            trend: "Withdrawal requests",
            color: "text-purple-400"
        },
        {
            title: "Next Event",
            value: "Mega",
            icon: Gavel,
            trend: "Scheduled Draw",
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
                        <div className="bg-purple-500/20 text-purple-400 p-1.5 rounded-md">
                            <ShieldAlert className="w-4 h-4 fill-current" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500/80">Nexus Authority</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-2xl">
                        Prime Override
                    </h1>
                    <p className="text-zinc-500 font-medium mt-1">
                        Global platform governance and personnel management.
                    </p>
                </motion.div>

                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/10 bg-white/[0.02] text-zinc-300 rounded-xl font-bold h-12">
                        <Settings className="w-4 h-4 mr-2" />
                        Core Config
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-500 text-white font-black h-12 rounded-xl px-8 border-0 shadow-lg shadow-purple-900/20">
                        Launch Mega Draw
                    </Button>
                </div>
            </div>

            {/* Stats Section */}
            <StatsGrid stats={platformStats} />

            {/* User Management Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-white tracking-tight uppercase">Platform Personnel</h2>
                    <Button variant="ghost" className="text-xs font-bold text-zinc-500 hover:text-purple-400 uppercase tracking-widest">
                        Detailed User Analytics
                    </Button>
                </div>
                <UserTable
                    users={usersResponse?.items || []}
                    isLoading={isUsersLoading}
                    onToggleStatus={(id) => toggleMutation.mutate(id)}
                />
            </section>
        </div>
    );
}
