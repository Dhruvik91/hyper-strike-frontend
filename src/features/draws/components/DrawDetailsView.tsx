"use client";

import { motion } from "framer-motion";
import { Trophy, ArrowLeft, Calendar, Users, CheckCircle, Clock } from "lucide-react";
import { WinnerVisualization } from "./WinnerVisualization";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/constants";
import { DrawWinner, Draw } from "@/constants/interface";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface DrawDetailsViewProps {
    draw?: Draw;
    winners: DrawWinner[];
    isLoading: boolean;
}

export function DrawDetailsView({
    draw,
    winners,
    isLoading
}: DrawDetailsViewProps) {
    if (isLoading) {
        return (
            <div className="space-y-8 pb-20">
                <Skeleton className="h-12 w-64" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Button variant="ghost" className="text-zinc-500 hover:text-white mb-6" asChild>
                    <Link href={FRONTEND_ROUTES.USER.DRAWS}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Draws
                    </Link>
                </Button>

                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-amber-500/20 text-amber-400 p-2 rounded-xl border border-amber-500/20 shadow-lg">
                        <Trophy className="w-5 h-5 fill-current" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/80">Draw Details</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white lg:text-6xl drop-shadow-2xl">
                    Victory <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Ledger</span>
                </h1>
                {draw && (
                    <p className="text-zinc-500 font-medium mt-4 text-base md:text-lg leading-relaxed">
                        Results for {format(new Date(draw.draw_date), "MMMM dd, yyyy 'at' hh:mm a")}
                    </p>
                )}
            </motion.div>

            {draw && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl">
                        <CardContent className="p-6 md:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-zinc-400 mb-1">
                                        <Calendar className="w-4 h-4" />
                                        <p className="text-xs font-bold uppercase tracking-widest">Draw Date</p>
                                    </div>
                                    <p className="text-lg font-black text-white">
                                        {format(new Date(draw.draw_date), "MMM dd, yyyy")}
                                    </p>
                                    <p className="text-sm text-zinc-500">
                                        {format(new Date(draw.draw_date), "hh:mm a")}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-zinc-400 mb-1">
                                        <Users className="w-4 h-4" />
                                        <p className="text-xs font-bold uppercase tracking-widest">Total Tickets</p>
                                    </div>
                                    <p className="text-lg font-black text-white">
                                        {draw.total_tickets.toLocaleString()}
                                    </p>
                                    <p className="text-sm text-zinc-500">Participants</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-zinc-400 mb-1">
                                        {draw.status === 'completed' ? (
                                            <CheckCircle className="w-4 h-4" />
                                        ) : (
                                            <Clock className="w-4 h-4" />
                                        )}
                                        <p className="text-xs font-bold uppercase tracking-widest">Status</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider border ${
                                            draw.status === 'completed' 
                                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                                : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                        }`}>
                                            {draw.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-1 shadow-2xl overflow-hidden relative">
                    <div className="relative z-10 bg-black/40 rounded-[1.4rem] min-h-[500px] flex flex-col items-center justify-center">
                        {winners && winners.length > 0 ? (
                            <WinnerVisualization winners={winners} drawType={draw?.type || "WEEKLY"} />
                        ) : (
                            <div className="text-center py-20 px-6">
                                <Trophy className="w-16 h-16 text-zinc-700 mx-auto mb-6" />
                                <h3 className="text-xl font-bold text-white mb-2">No Winners Yet</h3>
                                <p className="text-zinc-500 text-sm">
                                    {draw?.status === 'upcoming' 
                                        ? 'Winners will be announced after the draw is completed.'
                                        : 'No winners have been selected for this draw yet.'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {winners && winners.length > 0 && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-3">
                        <Trophy className="w-5 h-5 text-amber-400" />
                        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Official Winners</h2>
                        <div className="h-px flex-1 bg-white/5 ml-4" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {winners.map((winner, index) => (
                            <motion.div
                                key={winner.id || index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl hover:border-amber-500/20 transition-colors group">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm ${
                                                    index === 0 
                                                        ? 'bg-amber-500/20 border-2 border-amber-500/40 text-amber-400'
                                                        : index === 1
                                                        ? 'bg-zinc-400/20 border-2 border-zinc-400/40 text-zinc-300'
                                                        : index === 2
                                                        ? 'bg-orange-500/20 border-2 border-orange-500/40 text-orange-400'
                                                        : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                                                }`}>
                                                    #{winner.prize_rank || index + 1}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-white">
                                                        {winner.user?.email?.split('@')[0] || 'Winner'}
                                                    </p>
                                                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                                                        {winner.win_type?.replace('_', ' ') || 'Random Draw'}
                                                    </p>
                                                    <p className="text-xs text-zinc-600 font-mono mt-1">
                                                        {winner.ticket_number}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-black text-amber-400">
                                                    {winner.prize_amount_crypto} USDT
                                                </p>
                                                {winner.prize_amount_inr && (
                                                    <p className="text-sm text-zinc-500 font-medium">
                                                        ₹{parseFloat(winner.prize_amount_inr).toLocaleString("en-IN")}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            )}
        </div>
    );
}
