"use client";

import { useAdminStatsQuery } from "@/hooks/queries/use-admin";
import { AdminDashboardView } from "../components/AdminDashboardView";
import { Users, DollarSign, TrendingUp, Activity } from "lucide-react";

export function AdminDashboardContainer() {
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
        <AdminDashboardView
            stats={adminStats}
            isLoading={isLoading}
            commissions={stats?.commissions || []}
        />
    );
}
