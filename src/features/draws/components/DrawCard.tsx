"use client";

import { motion } from "framer-motion";
import { Trophy, Calendar, Users, Ticket, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Draw } from "@/constants/interface";
import { format } from "date-fns";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/constants";

interface DrawCardProps {
    draw: Draw;
}

export function DrawCard({ draw }: DrawCardProps) {
    const isCompleted = draw.status === "COMPLETED";
    const isOngoing = draw.status === "ACTIVE";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl overflow-hidden group h-full flex flex-col">
                {/* Glow effect */}
                <div className={`absolute -right-4 -top-4 w-32 h-32 blur-3xl opacity-10 transition-opacity rounded-full px-1 py-1 ${draw.type === 'MEGA' ? 'bg-amber-500' : 'bg-emerald-500'}`} />

                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <div className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${draw.type === 'MEGA' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {draw.type} Draw
                        </div>
                        <div className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${isCompleted ? 'bg-zinc-800 text-zinc-500' : isOngoing ? 'bg-emerald-500/20 text-emerald-400 animate-pulse' : 'bg-blue-500/20 text-blue-400'}`}>
                            {draw.status}
                        </div>
                    </div>
                    <CardTitle className="text-xl font-black text-white mt-4 group-hover:text-emerald-400 transition-colors">
                        {draw.type === 'MEGA' ? 'Mega Strike Event' : 'Weekly Lucky Draw'}
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 space-y-4 pt-2">
                    <div className="flex items-center gap-3 text-zinc-400">
                        <Calendar className="w-4 h-4 text-emerald-500/60" />
                        <span className="text-xs font-medium lowercase first-letter:uppercase">
                            {format(new Date(draw.scheduled_at), "PPP 'at' p")}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5">
                            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Prize Pool</div>
                            <div className="text-sm font-black text-white italic tracking-tight">
                                {draw.type === 'MEGA' ? '₹1,00,000+' : '₹10,000+'}
                            </div>
                        </div>
                        <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5">
                            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Participants</div>
                            <div className="text-sm font-black text-white italic tracking-tight">
                                500+
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="pt-2">
                    {isCompleted ? (
                        <Button variant="outline" className="w-full border-white/10 text-zinc-400 hover:text-white rounded-xl font-bold" asChild>
                            <Link href={`${FRONTEND_ROUTES.USER.DRAWS}/${draw.id}`}>
                                View Winners <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    ) : (
                        <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-xl border-0 shadow-lg" asChild>
                            <Link href={FRONTEND_ROUTES.USER.TICKETS}>
                                Get Tickets <Ticket className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </motion.div>
    );
}
