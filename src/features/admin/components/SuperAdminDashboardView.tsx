"use client";

import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { StatsGrid } from "@/features/dashboard/components/StatsGrid";
import { UserTable } from "./UserTable";
import { UserProfile } from "@/constants/interface";
import { CreateAdminDialog } from "./CreateAdminDialog";
import { CreateDrawDialog } from "./CreateDrawDialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SuperAdminDashboardViewProps {
    stats: any[];
    users: UserProfile[];
    isUsersLoading: boolean;
    onToggleStatus: (id: string) => void;
}

export function SuperAdminDashboardView({
    stats,
    users,
    isUsersLoading,
    onToggleStatus
}: SuperAdminDashboardViewProps) {
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

                <div className="flex flex-wrap gap-3">
                    <Link href="/super-admin/config">
                        <Button variant="outline" className="border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 rounded-xl font-bold h-11">
                            Platform Config
                        </Button>
                    </Link>
                    <CreateAdminDialog />
                    <CreateDrawDialog />
                </div>
            </div>

            {/* Stats Section */}
            <StatsGrid stats={stats} />

            {/* User Management Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-white tracking-tight uppercase">Platform Personnel</h2>
                    <Button variant="ghost" className="text-xs font-bold text-zinc-500 hover:text-purple-400 uppercase tracking-widest">
                        Detailed User Analytics
                    </Button>
                </div>
                <UserTable
                    users={users}
                    isLoading={isUsersLoading}
                    onToggleStatus={onToggleStatus}
                />
            </section>
        </div>
    );
}
