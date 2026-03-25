"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Ticket as TicketIcon, Trophy, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Ticket, Draw } from "@/constants/interface";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { FRONTEND_ROUTES } from "@/constants/constants";

interface TicketDetailViewProps {
    ticket?: Ticket;
    draw?: Draw;
    isLoading: boolean;
}

export function TicketDetailView({ ticket, draw, isLoading }: TicketDetailViewProps) {
    const router = useRouter();

    if (isLoading) {
        return (
            <div className="space-y-8 pb-20">
                <Skeleton className="h-12 w-64" />
                <Card className="bg-zinc-950/40 border-white/5">
                    <CardContent className="p-8">
                        <Skeleton className="h-32 w-full" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="space-y-8 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Button
                        variant="ghost"
                        onClick={() => router.push(FRONTEND_ROUTES.USER.TICKETS)}
                        className="mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Tickets
                    </Button>
                </motion.div>
                <Card className="bg-zinc-950/40 border-white/5">
                    <CardContent className="p-12 text-center">
                        <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-black text-white mb-2">Ticket Not Found</h2>
                        <p className="text-zinc-500">The ticket you're looking for doesn't exist or has been removed.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Button
                    variant="ghost"
                    onClick={() => router.push(FRONTEND_ROUTES.USER.TICKETS)}
                    className="mb-6 text-zinc-400 hover:text-white"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Tickets
                </Button>

                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-500/20 text-blue-400 p-2 rounded-xl border border-blue-500/20 shadow-lg">
                        <TicketIcon className="w-5 h-5 fill-current" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500/80">Ticket Details</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white lg:text-6xl drop-shadow-2xl">
                    {ticket.ticket_number}
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 backdrop-blur-xl overflow-hidden">
                    <CardContent className="p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Ticket Number</p>
                                    <p className="text-2xl md:text-3xl font-black text-white tracking-tight font-mono">
                                        {ticket.ticket_number}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Status</p>
                                    <div className="flex items-center gap-2">
                                        {ticket.is_winner ? (
                                            <>
                                                <Trophy className="w-5 h-5 text-amber-400" />
                                                <span className="px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                                    Winner
                                                </span>
                                            </>
                                        ) : draw?.status === 'completed' ? (
                                            <>
                                                <XCircle className="w-5 h-5 text-zinc-400" />
                                                <span className="px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider bg-zinc-500/20 text-zinc-400 border border-zinc-500/30">
                                                    Not Selected
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <Clock className="w-5 h-5 text-blue-400" />
                                                <span className="px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                                    Active
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {ticket.purchase_price_inr && (
                                    <div>
                                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Purchase Price</p>
                                        <p className="text-xl font-black text-white">
                                            ₹{parseFloat(ticket.purchase_price_inr).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                                        </p>
                                        {ticket.purchase_price_crypto && (
                                            <p className="text-sm text-zinc-500 font-medium mt-1">
                                                {parseFloat(ticket.purchase_price_crypto).toFixed(4)} USDT
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                {draw && (
                                    <>
                                        <div>
                                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Draw Event</p>
                                            <div className="flex items-center gap-2 text-purple-400">
                                                <Calendar className="w-4 h-4" />
                                                <p className="text-lg font-bold">
                                                    {format(new Date(draw.draw_date), "MMMM dd, yyyy 'at' hh:mm a")}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Draw Status</p>
                                            <div className="flex items-center gap-2">
                                                {draw.status === 'completed' ? (
                                                    <>
                                                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                                                        <span className="px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                                            Completed
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Clock className="w-5 h-5 text-amber-400" />
                                                        <span className="px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                                            Upcoming
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Total Participants</p>
                                            <p className="text-xl font-black text-white">
                                                {draw.total_tickets.toLocaleString()} Tickets
                                            </p>
                                        </div>
                                    </>
                                )}

                                <div>
                                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Purchased On</p>
                                    <p className="text-lg font-bold text-white">
                                        {format(new Date(ticket.created_at), "MMM dd, yyyy 'at' hh:mm a")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {ticket.is_winner && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-8 p-6 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <Trophy className="w-6 h-6 text-amber-400" />
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Congratulations!</h3>
                                </div>
                                <p className="text-zinc-300 font-medium">
                                    This ticket was selected as a winner! Your prize has been credited to your wallet.
                                </p>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>

            {draw && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl">
                        <CardContent className="p-6 md:p-8">
                            <h3 className="text-lg font-black text-white mb-4 uppercase tracking-tight">Draw Information</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-sm text-zinc-400 font-medium">Draw ID</span>
                                    <span className="text-sm text-white font-mono">{draw.id.slice(0, 8)}...</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-sm text-zinc-400 font-medium">Draw Type</span>
                                    <span className="text-sm text-white font-bold uppercase">{draw.type || 'WEEKLY'}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-sm text-zinc-400 font-medium">Winners Selected</span>
                                    <span className="text-sm text-white font-bold">
                                        {draw.winners_selected ? 'Yes' : 'No'}
                                    </span>
                                </div>
                                {draw.completed_at && (
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-zinc-400 font-medium">Completed At</span>
                                        <span className="text-sm text-white font-medium">
                                            {format(new Date(draw.completed_at), "MMM dd, yyyy")}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
