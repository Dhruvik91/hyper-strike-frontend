"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingUp } from "lucide-react";
import { Commission } from "@/constants/interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { format } from "date-fns";

interface AdminCommissionsViewProps {
    commissions: Commission[];
    total: number;
    page: number;
    totalPages: number;
    isLoading: boolean;
    onPageChange: (page: number) => void;
}

export function AdminCommissionsView({
    commissions,
    total,
    isLoading,
}: AdminCommissionsViewProps) {
    if (isLoading) {
        return (
            <div className="space-y-8">
                <h1 className="text-4xl font-black text-white">Commission Earnings</h1>
                <TableSkeleton rows={10} />
            </div>
        );
    }

    const totalEarned = commissions.reduce((sum, c) => sum + parseFloat(c.amount_crypto), 0);

    return (
        <div className="space-y-8 pb-20">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-black text-white mb-2">Commission Earnings</h1>
                <p className="text-zinc-500">Track your earnings from referral network</p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{total}</div>
                        <p className="text-xs text-muted-foreground mt-1">Commission transactions</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalEarned.toFixed(4)} USDT</div>
                        <p className="text-xs text-muted-foreground mt-1">Lifetime earnings</p>
                    </CardContent>
                </Card>
            </div>

            {commissions.length === 0 ? (
                <EmptyState
                    icon={DollarSign}
                    title="No commissions yet"
                    description="Start referring users to earn commissions"
                />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Commission History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {commissions.map((commission) => (
                                <div
                                    key={commission.id}
                                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex-1">
                                        <p className="font-semibold">{parseFloat(commission.amount_crypto).toFixed(4)} USDT</p>
                                        <p className="text-sm text-muted-foreground">
                                            {format(new Date(commission.created_at), "MMM dd, yyyy 'at' h:mm a")}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-700">
                                            {commission.status || "Completed"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
