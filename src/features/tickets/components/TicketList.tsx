"use client";

import { Ticket } from "@/constants/interface";
import { motion } from "framer-motion";
import { Ticket as TicketIcon, Calendar, CheckCircle, Clock } from "lucide-react";

interface TicketListProps {
    tickets: Ticket[];
    isLoading?: boolean;
}

export function TicketList({ tickets, isLoading }: TicketListProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-40 rounded-3xl bg-zinc-900/40 border border-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    if (tickets.length === 0) {
        return (
            <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-white/5">
                <TicketIcon className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg">No tickets found</h3>
                <p className="text-zinc-500 text-sm mt-1">Acquire your first ticket to join the next strike!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket, index) => (
                <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative bg-zinc-950/40 border border-white/5 p-6 rounded-3xl group overflow-hidden"
                >
                    {/* Decorative elements */}
                    <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                        <TicketIcon className="w-40 h-40 text-white" />
                    </div>

                    <div className="flex justify-between items-start mb-6">
                        <div className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded-xl border border-emerald-500/20">
                            <TicketIcon className="w-5 h-5" />
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${ticket.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                            {ticket.status === 'ACTIVE' ? <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Valid</span> : 'Used'}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Ticket Identification</p>
                            <h4 className="text-2xl font-black text-white tracking-widest group-hover:text-emerald-400 transition-colors">#{ticket.ticket_number}</h4>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2 text-zinc-500">
                                <Calendar className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold uppercase">{new Date(ticket.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-sm font-black text-white">₹{ticket.purchase_price_inr}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
