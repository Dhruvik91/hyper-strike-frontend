"use client";

import { motion } from "framer-motion";
import { Users, Mail, Phone } from "lucide-react";
import { UserProfile } from "@/constants/interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { format } from "date-fns";

interface AdminReferralsViewProps {
    referrals: UserProfile[];
    isLoading: boolean;
}

export function AdminReferralsView({ referrals, isLoading }: AdminReferralsViewProps) {
    if (isLoading) {
        return (
            <div className="space-y-8">
                <h1 className="text-4xl font-black text-white">My Referrals</h1>
                <TableSkeleton rows={10} />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-black text-white mb-2">My Referrals</h1>
                <p className="text-zinc-500">Users who signed up using your referral link</p>
            </motion.div>

            {referrals.length === 0 ? (
                <EmptyState
                    icon={Users}
                    title="No referrals yet"
                    description="Share your referral link to start earning commissions"
                />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>{referrals.length} Referrals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {referrals.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                                >
                                    <div className="shrink-0">
                                        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                                            <Users className="h-6 w-6 text-primary" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <p className="text-sm font-medium truncate">{user.email}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">{user.whatsapp_number}</p>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Joined {format(new Date(user.created_at), "MMM dd, yyyy")}
                                        </p>
                                    </div>
                                    <div className="shrink-0">
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                user.is_active
                                                    ? "bg-green-500/20 text-green-700"
                                                    : "bg-gray-500/20 text-gray-700"
                                            }`}
                                        >
                                            {user.is_active ? "Active" : "Inactive"}
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
