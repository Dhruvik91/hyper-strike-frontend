"use client";

import { useDrawDetailsQuery, useDrawWinnersQuery } from "@/hooks/queries/use-draws";
import { useSelectWinnersMutation } from "@/hooks/queries/use-super-admin";
import { motion } from "framer-motion";
import { Trophy, Calendar, Clock, CheckCircle2, Zap, ArrowLeft, Users } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ManualWinnerDialog } from "../components/ManualWinnerDialog";

interface DrawDetailsContainerProps {
    drawId: string;
}

export function DrawDetailsContainer({ drawId }: DrawDetailsContainerProps) {
    const { data: draw, isLoading: isDrawLoading } = useDrawDetailsQuery(drawId);
    const { data: winners, isLoading: isWinnersLoading } = useDrawWinnersQuery(drawId);
    const selectWinnersMutation = useSelectWinnersMutation();

    const handleAutoSelectWinners = () => {
        if (confirm("Are you sure you want to automatically select winners for this draw?")) {
            selectWinnersMutation.mutate(drawId);
        }
    };

    if (isDrawLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!draw) {
        return (
            <div className="text-center py-20">
                <Trophy className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-zinc-500 font-black text-lg">Draw not found</h3>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'UPCOMING':
                return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
            case 'ACTIVE':
                return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
            case 'COMPLETED':
                return 'bg-purple-500/10 border-purple-500/20 text-purple-400';
            default:
                return 'bg-zinc-500/10 border-zinc-500/20 text-zinc-400';
        }
    };

    return (
        <div className="space-y-10 pb-16">
            {/* Header */}
            <div className="space-y-6">
                <Link href="/super-admin/draws">
                    <Button variant="ghost" className="text-zinc-400 hover:text-white -ml-2">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Draws
                    </Button>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${getStatusColor(draw.status)}`}>
                            {draw.status === 'COMPLETED' ? (
                                <CheckCircle2 className="w-4 h-4" />
                            ) : draw.status === 'ACTIVE' ? (
                                <Zap className="w-4 h-4" />
                            ) : (
                                <Clock className="w-4 h-4" />
                            )}
                            <span className="text-xs font-black uppercase tracking-widest">{draw.status}</span>
                        </div>
                    </div>
                    <h1 className="text-5xl font-black tracking-tight text-white drop-shadow-2xl">
                        {draw.type} DRAW
                    </h1>
                    <div className="flex items-center gap-2 text-zinc-400 mt-3">
                        <Calendar className="w-5 h-5" />
                        <span className="text-lg font-bold">
                            Scheduled: {format(new Date(draw.scheduled_at), "MMMM dd, yyyy • hh:mm a")}
                        </span>
                    </div>
                    {draw.completed_at && (
                        <div className="flex items-center gap-2 text-emerald-400 mt-2">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-lg font-bold">
                                Completed: {format(new Date(draw.completed_at), "MMMM dd, yyyy • hh:mm a")}
                            </span>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Actions */}
            {draw.status === 'ACTIVE' && (
                <div className="flex flex-wrap gap-3">
                    <Button
                        onClick={handleAutoSelectWinners}
                        disabled={selectWinnersMutation.isPending}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 h-11 rounded-2xl shadow-xl shadow-emerald-900/20 border-0"
                    >
                        <Trophy className="w-4 h-4 mr-2" />
                        {selectWinnersMutation.isPending ? "Selecting..." : "Auto-Select Winners"}
                    </Button>
                    <ManualWinnerDialog drawId={drawId} />
                </div>
            )}

            {/* Winners Section */}
            <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl">
                <CardHeader>
                    <CardTitle className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-400" />
                        Winners {winners && winners.length > 0 && `(${winners.length})`}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isWinnersLoading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-20 rounded-2xl bg-zinc-900/40 border border-white/5 animate-pulse" />
                            ))}
                        </div>
                    ) : winners && winners.length > 0 ? (
                        <div className="space-y-3">
                            {winners.map((winner, index) => (
                                <motion.div
                                    key={winner.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-black/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white font-black text-lg">
                                            #{index + 1}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-white">
                                                {winner.user?.first_name
                                                    ? `${winner.user.first_name} ${winner.user.last_name || ''}`
                                                    : `User #${winner.user_id.slice(-6)}`}
                                            </p>
                                            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-1">
                                                {winner.win_type.replace('_', ' ')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-emerald-400">₹{winner.prize_amount_inr}</p>
                                        <p className="text-xs text-zinc-500 font-bold mt-1">
                                            {format(new Date(winner.created_at), "MMM dd, yyyy")}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-zinc-900/20 rounded-2xl border border-white/5 border-dashed">
                            <Trophy className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                            <h3 className="text-zinc-500 font-bold text-sm">No winners selected yet</h3>
                            <p className="text-zinc-600 text-xs mt-1">
                                {draw.status === 'ACTIVE' ? 'Select winners to complete this draw' : 'Winners will appear here once selected'}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
