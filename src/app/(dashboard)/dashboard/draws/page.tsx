"use client";

import { motion } from "framer-motion";
import { Trophy, Zap, Sparkles } from "lucide-react";
import { useUpcomingDrawQuery, useDrawHistoryQuery } from "@/hooks/queries/use-draws";
import { DrawList } from "@/features/draws/components/DrawList";
import { MegaEventHero } from "@/features/draws/components/MegaEventHero";

export default function DrawsPage() {

    const { data: upcomingDraw, isLoading: isUpcomingLoading } = useUpcomingDrawQuery();
    const { data: historyResponse, isLoading: isHistoryLoading } = useDrawHistoryQuery(1, 12);

    return (
        <div className="space-y-12 pb-20">
            {/* Hero Section */}
            <div className="relative">
                <div className="absolute top-[-50%] left-[-10%] w-[40%] h-[400px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-amber-500/20 text-amber-400 p-2 rounded-xl border border-amber-500/20 shadow-lg">
                            <Trophy className="w-5 h-5 fill-current" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/80">Tournament Arena</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter text-white lg:text-6xl drop-shadow-2xl">
                        Strike <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Gold</span>
                    </h1>
                    <p className="text-zinc-500 font-medium mt-4 max-w-xl text-lg leading-relaxed">
                        Your destiny awaits in the pool of fortune. Participate in our weekly strikes and the legendary Mega Events.
                    </p>
                </motion.div>
            </div>

            {/* Mega Event Hero */}
            <MegaEventHero />

            {/* Main Grid */}
            <div className="space-y-16">
                {/* Active/Next Draw */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <Zap className="w-5 h-5 text-emerald-400" />
                        <h2 className="text-2xl font-black text-white tracking-tight uppercase">Upcoming Strike</h2>
                        <div className="h-px flex-1 bg-white/5 ml-4" />
                    </div>

                    {upcomingDraw ? (
                        <div className="max-w-md">
                            <DrawList draws={[upcomingDraw]} isLoading={isUpcomingLoading} />
                        </div>
                    ) : (
                        <DrawList draws={[]} isLoading={isUpcomingLoading} />
                    )}
                </section>

                {/* Draw History */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <Sparkles className="w-5 h-5 text-blue-400" />
                        <h2 className="text-2xl font-black text-white tracking-tight uppercase">Draw History</h2>
                        <div className="h-px flex-1 bg-white/5 ml-4" />
                    </div>

                    <DrawList draws={historyResponse?.items || []} isLoading={isHistoryLoading} />
                </section>
            </div>
        </div>
    );
}
