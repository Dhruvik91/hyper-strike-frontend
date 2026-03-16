"use client";

import { motion } from "framer-motion";
import { Trophy, ArrowLeft } from "lucide-react";
import { WinnerVisualization } from "./WinnerVisualization";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/constants";
import { DrawWinner } from "@/constants/interface";

interface DrawDetailsViewProps {
    drawId: string;
    winners: DrawWinner[];
    isLoading: boolean;
}

export function DrawDetailsView({
    drawId,
    winners,
    isLoading
}: DrawDetailsViewProps) {
    return (
        <div className="space-y-12 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Button variant="ghost" className="text-zinc-500 hover:text-white" asChild>
                    <Link href={FRONTEND_ROUTES.USER.DRAWS}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Arena
                    </Link>
                </Button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-2xl mx-auto"
            >
                <div className="bg-amber-500/20 text-amber-400 p-3 rounded-2xl inline-block mb-6 border border-amber-500/20 shadow-xl shadow-amber-900/10">
                    <Trophy className="w-8 h-8 fill-current" />
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-white mb-4 italic uppercase">Victory Ledger</h1>
                <p className="text-zinc-500 text-lg font-medium">
                    The records of fortune for Strike <span className="text-white font-black">#{drawId.slice(-6)}</span>. Review the champions or commence the reveal sequence.
                </p>
            </motion.div>

            {/* Main Content Area */}
            <div className="bg-zinc-950/40 border border-white/5 rounded-[3rem] p-1 shadow-2xl overflow-hidden relative">
                {/* Visualizer */}
                <div className="relative z-10 bg-black/40 rounded-[2.8rem] min-h-[500px] flex flex-col items-center justify-center">
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                            <p className="text-xs font-black text-amber-500 uppercase tracking-widest">Retrieving Victory Records...</p>
                        </div>
                    ) : winners && winners.length > 0 ? (
                        <WinnerVisualization winners={winners} drawType="WEEKLY" />
                    ) : (
                        <div className="text-center py-20 px-6">
                            <Trophy className="w-16 h-16 text-zinc-700 mx-auto mb-6" />
                            <h3 className="text-xl font-bold text-white mb-2">No winners found for this draw</h3>
                            <p className="text-zinc-500 text-sm">Either the draw is still ongoing or the records are being finalized.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Manual Winner List (Optional fallback) */}
            {!isLoading && winners && winners.length > 0 && (
                <section className="max-w-4xl mx-auto space-y-6">
                    <h2 className="text-xl font-black text-white uppercase tracking-widest text-center underline decoration-amber-500 underline-offset-8">Official Standings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {winners.map((winner) => (
                            <div key={winner.id} className="bg-zinc-950/40 border border-white/5 p-5 rounded-2xl flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-xs">
                                        {winner.rank}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{winner.user?.first_name || 'Striker'}</p>
                                        <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase italic">#{winner.ticket?.ticket_number}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-amber-500">₹{winner.prize_amount || '1,000'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
