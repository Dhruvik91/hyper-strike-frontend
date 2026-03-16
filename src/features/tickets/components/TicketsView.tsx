"use client";

import { motion } from "framer-motion";
import { Ticket as TicketIcon, ShoppingCart, Zap, AlertCircle } from "lucide-react";
import { TicketList } from "./TicketList";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ticket } from "@/constants/interface";

interface TicketsViewProps {
    tickets: Ticket[];
    totalTickets: number;
    isTicketsLoading: boolean;
    ticketPrice: number;
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    onPurchase: () => void;
    isPurchasing: boolean;
}

export function TicketsView({
    tickets,
    totalTickets,
    isTicketsLoading,
    ticketPrice,
    quantity,
    onQuantityChange,
    onPurchase,
    isPurchasing
}: TicketsViewProps) {
    return (
        <div className="space-y-12 pb-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-xl border border-emerald-500/20 shadow-lg">
                        <TicketIcon className="w-5 h-5 fill-current" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/80">Inventory Archive</span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-white lg:text-6xl drop-shadow-2xl">
                    My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Tickets</span>
                </h1>
                <p className="text-zinc-500 font-medium mt-4 max-w-xl text-lg leading-relaxed">
                    Manage your entries for the upcoming strikes. Every ticket is a unique cryptographic chance at the jackpot.
                </p>
            </motion.div>

            {/* Quick Purchase */}
            <Card className="bg-zinc-950/40 border-white/10 backdrop-blur-xl border-dashed relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                    <Zap className="w-40 h-40 text-emerald-400" />
                </div>
                <CardContent className="p-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-black text-white mb-2 underline decoration-emerald-500/30 underline-offset-8">Quick Acquisition</h3>
                        <p className="text-zinc-500 font-medium">Current single entry price: <span className="text-emerald-400 font-black italic">₹{ticketPrice}</span></p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="flex items-center bg-black/60 border border-white/10 rounded-2xl p-1 w-full sm:w-auto">
                            {[1, 5, 10, 50].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => onQuantityChange(num)}
                                    className={`px-4 py-3 rounded-xl text-xs font-black transition-all ${quantity === num ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                                >
                                    {num}x
                                </button>
                            ))}
                        </div>
                        <Button
                            onClick={onPurchase}
                            disabled={isPurchasing}
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black px-10 h-14 rounded-2xl shadow-2xl shadow-emerald-900/20 border-0 w-full sm:w-auto transition-transform hover:scale-[1.02]"
                        >
                            {isPurchasing ? "Processing..." : "Launch Entry"}
                            <ShoppingCart className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Warning/Notes */}
            <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-3xl flex gap-4 items-start">
                <AlertCircle className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-400 font-medium leading-relaxed">
                    <span className="text-blue-400 font-black uppercase tracking-wider block mb-1">On-Chain Verification</span>
                    Tickets are generated and stored securely. Once a ticket is used in a draw, its status will reflect as 'Used'. You can verify your ticket numbers against the winner list after each draw.
                </p>
            </div>

            {/* Ticket Grid */}
            <section className="space-y-8">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-black text-white tracking-tight uppercase">Active Collection</h2>
                    <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-zinc-400">
                        {totalTickets} TOTAL
                    </div>
                </div>
                <TicketList tickets={tickets} isLoading={isTicketsLoading} />
            </section>
        </div>
    );
}
