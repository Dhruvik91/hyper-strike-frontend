"use client";

import { useSuperAdminUsersQuery, useToggleUserStatusMutation } from "@/hooks/queries/use-super-admin";
import { SuperAdminDashboardView } from "../components/SuperAdminDashboardView";
import { Users, Cpu, RefreshCcw, Gavel } from "lucide-react";

export function SuperAdminDashboardContainer() {
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

    const handleToggleStatus = (id: string) => {
        toggleMutation.mutate(id);
    };

    return (
        <SuperAdminDashboardView
            stats={platformStats}
            users={usersResponse?.items || []}
            isUsersLoading={isUsersLoading}
            onToggleStatus={handleToggleStatus}
        />
    );
}
