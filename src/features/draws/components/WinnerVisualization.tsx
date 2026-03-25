"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Sparkles, User, Ticket } from "lucide-react";
import { useState, useEffect } from "react";
import { DrawWinner } from "@/constants/interface";

interface WinnerVisualizationProps {
    winners: DrawWinner[];
    drawType: 'WEEKLY' | 'MEGA' | 'DAILY';
    onComplete?: () => void;
}

export function WinnerVisualization({ winners, drawType, onComplete }: WinnerVisualizationProps) {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isRevealing, setIsRevealing] = useState(false);

    const startReveal = () => {
        setIsRevealing(true);
        setCurrentIndex(0);
    };

    useEffect(() => {
        if (currentIndex >= 0 && currentIndex < winners.length) {
            const timer = setTimeout(() => {
                setCurrentIndex(prev => prev + 1);
            }, 3000); // 3 seconds per winner reveal
            return () => clearTimeout(timer);
        } else if (currentIndex === winners.length) {
            setTimeout(() => onComplete?.(), 2000);
        }
    }, [currentIndex, winners.length, onComplete]);

    return (
        <div className="relative min-h-[400px] flex flex-col items-center justify-center overflow-hidden py-10 px-4">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20"
                >
                    <div className="w-full h-full border border-dashed border-emerald-500/30 rounded-full" />
                </motion.div>
            </div>

            {!isRevealing ? (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center relative z-10"
                >
                    <div className="mb-8 relative inline-block">
                        <Trophy className="w-24 h-24 text-amber-500 animate-bounce" />
                        <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-amber-300 animate-pulse" />
                    </div>
                    <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter italic">Winners Awaiting Strike</h2>
                    <button
                        onClick={startReveal}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black px-12 py-5 rounded-2xl text-xl shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition-all"
                    >
                        Commence Reveal
                    </button>
                </motion.div>
            ) : (
                <div className="relative z-10 w-full max-w-lg">
                    <AnimatePresence mode="wait">
                        {currentIndex < winners.length ? (
                            <motion.div
                                key={winners[currentIndex].id}
                                initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
                                transition={{ type: "spring", damping: 15, stiffness: 100 }}
                                className="bg-zinc-950/60 border border-white/10 backdrop-blur-2xl p-10 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden"
                            >
                                {/* Winner Card Inner GLOW */}
                                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest mb-6">
                                        <Star className="w-3.5 h-3.5 fill-current" /> Winner #{currentIndex + 1}
                                    </div>

                                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-900 border-2 border-emerald-500/30 mx-auto flex items-center justify-center mb-6 relative group">
                                        <User className="w-16 h-16 text-zinc-600" />
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.6 }}
                                            className="absolute -bottom-2 -right-2 bg-emerald-500 w-10 h-10 rounded-full border-4 border-zinc-950 flex items-center justify-center"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-white" />
                                        </motion.div>
                                    </div>

                                    <h3 className="text-3xl font-black text-white mb-2 tracking-tight">
                                        {winners[currentIndex].user?.first_name || 'Striker'}
                                    </h3>
                                    <div className="flex items-center justify-center gap-2 text-emerald-400 font-black text-sm mb-8">
                                        <Ticket className="w-4 h-4" />
                                        <span className="tracking-widest italic">#{winners[currentIndex].ticket?.ticket_number}</span>
                                    </div>

                                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 drop-shadow-xl italic">
                                        ₹{winners[currentIndex].prize_amount_inr || (drawType === 'MEGA' ? '25,000' : '2,500')}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center"
                            >
                                <Trophy className="w-32 h-32 text-amber-500 mx-auto mb-6" />
                                <h2 className="text-4xl font-black text-white mb-2">Strike Complete</h2>
                                <p className="text-zinc-500 font-medium">All winners have been revealed. Check your wallet for prize distribution.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Progress indicators */}
                    <div className="flex justify-center gap-2 mt-12">
                        {winners.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-500 ${i < currentIndex ? 'bg-emerald-500 w-8' :
                                        i === currentIndex ? 'bg-white w-12 animate-pulse' :
                                            'bg-white/10 w-4'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function CheckCircle2(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
        </svg>
    );
}
