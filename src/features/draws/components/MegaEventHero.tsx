"use client";

import { motion } from "framer-motion";
import { Trophy, Zap, Users, Sparkles, Timer, ArrowRight, ShieldCheck } from "lucide-react";
import { useUpcomingDrawQuery } from "@/hooks/queries/use-draws";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/constants";

export function MegaEventHero() {
    const { data: upcomingDraw } = useUpcomingDrawQuery();
    const isMega = upcomingDraw?.type === 'MEGA';

    if (!upcomingDraw || !isMega) return null;

    return (
        <Card className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-amber-500/20 shadow-2xl shadow-amber-900/10 overflow-hidden relative group">
            {/* Dynamic Background FX */}
            <div className="absolute top-0 right-0 w-[40%] h-full bg-amber-500/5 blur-[100px] group-hover:bg-amber-500/10 transition-colors pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 opacity-[0.05]">
                <Trophy className="w-80 h-80 text-amber-500" />
            </div>

            <CardContent className="p-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-[0.2em]"
                        >
                            <Zap className="w-3.5 h-3.5 fill-current" /> Mega Event Detected
                        </motion.div>

                        <h2 className="text-5xl font-black text-white italic tracking-tighter leading-[0.9]">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Grand Strike</span> Tournament
                        </h2>

                        <p className="text-zinc-400 font-medium text-lg leading-relaxed max-w-lg">
                            The platform's highest-tier engagement. A massive prize pool awaits the ultimate strategic strikers.
                        </p>

                        <div className="flex flex-wrap gap-6 pt-4">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Prize Pool</p>
                                <p className="text-2xl font-black text-white">₹1,50,000</p>
                            </div>
                            <div className="w-px h-10 bg-white/10 hidden sm:block" />
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Strike Date</p>
                                <p className="text-2xl font-black text-white uppercase italic">
                                    {new Date(upcomingDraw.scheduled_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </p>
                            </div>
                            <div className="w-px h-10 bg-white/10 hidden sm:block" />
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Entry Fee</p>
                                <p className="text-2xl font-black text-emerald-400 italic">VIP Access</p>
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-black h-14 rounded-2xl px-10 shadow-2xl shadow-amber-900/30 border-0 group-hover:scale-[1.02] transition-transform" asChild>
                                <Link href={FRONTEND_ROUTES.USER.TICKETS}>
                                    Acquire Mega Tickets <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex justify-center">
                        <div className="relative">
                            {/* Visualizer Orb */}
                            <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-amber-500/20 to-black border border-amber-500/30 flex items-center justify-center p-4 relative overflow-hidden group-hover:border-amber-500/50 transition-colors">
                                <div className="absolute inset-0 bg-amber-500/5 animate-pulse" />
                                <Trophy className="w-32 h-32 text-amber-500/80 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]" />
                            </div>

                            {/* Stats floating boxes */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -top-4 -right-10 bg-zinc-900 border border-white/10 p-4 rounded-2xl shadow-2xl"
                            >
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-blue-400" />
                                    <div>
                                        <p className="text-[9px] font-black text-zinc-500 uppercase">Registered</p>
                                        <p className="text-sm font-black text-white italic">2.4k+</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="absolute -bottom-6 -left-12 bg-zinc-900 border border-white/10 p-4 rounded-2xl shadow-2xl"
                            >
                                <div className="flex items-center gap-3">
                                    <Sparkles className="w-5 h-5 text-purple-400" />
                                    <div>
                                        <p className="text-[9px] font-black text-zinc-500 uppercase">Jackpot Chance</p>
                                        <p className="text-sm font-black text-white italic">High-Yield</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
