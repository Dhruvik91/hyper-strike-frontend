"use client";

import { Draw } from "@/constants/interface";
import { motion } from "framer-motion";
import { Trophy, Calendar, Clock, CheckCircle2, Zap, Eye } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DrawsListProps {
    draws: Draw[];
    isLoading?: boolean;
    onSelectWinners?: (drawId: string) => void;
}

export function DrawsList({ draws, isLoading, onSelectWinners }: DrawsListProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-64 rounded-3xl bg-zinc-900/40 border border-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    if (draws.length === 0) {
        return (
            <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-white/5 border-dashed">
                <Trophy className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-zinc-500 font-black text-lg">No draws scheduled</h3>
                <p className="text-zinc-600 text-sm mt-2">Create your first draw to get started</p>
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

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'DAILY':
                return 'text-amber-400';
            case 'WEEKLY':
                return 'text-blue-400';
            case 'MEGA':
                return 'text-purple-400';
            default:
                return 'text-zinc-400';
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {draws.map((draw, index) => (
                <motion.div
                    key={draw.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 hover:bg-white/[0.02] transition-all group"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${getStatusColor(draw.status)}`}>
                            {draw.status === 'COMPLETED' ? (
                                <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : draw.status === 'ACTIVE' ? (
                                <Zap className="w-3.5 h-3.5" />
                            ) : (
                                <Clock className="w-3.5 h-3.5" />
                            )}
                            <span className="text-[10px] font-black uppercase tracking-widest">{draw.status}</span>
                        </div>
                        <div className={`text-2xl font-black ${getTypeColor(draw.type)}`}>
                            {draw.type === 'MEGA' ? '🎰' : draw.type === 'WEEKLY' ? '📅' : '⚡'}
                        </div>
                    </div>

                    {/* Draw Type */}
                    <h3 className={`text-2xl font-black mb-2 ${getTypeColor(draw.type)}`}>
                        {draw.type} DRAW
                    </h3>

                    {/* Scheduled Time */}
                    <div className="flex items-center gap-2 text-zinc-500 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-bold">
                            {format(new Date(draw.scheduled_at), "MMM dd, yyyy • hh:mm a")}
                        </span>
                    </div>

                    {/* Completed Time */}
                    {draw.completed_at && (
                        <div className="flex items-center gap-2 text-emerald-500 mb-4">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-xs font-bold">
                                Completed {format(new Date(draw.completed_at), "MMM dd, yyyy")}
                            </span>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 mt-6 pt-4 border-t border-white/5">
                        <Link href={`/super-admin/draws/${draw.id}`} className="flex-1">
                            <Button
                                variant="outline"
                                className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10 h-10 rounded-xl font-bold text-xs"
                            >
                                <Eye className="w-3.5 h-3.5 mr-2" />
                                View Details
                            </Button>
                        </Link>
                        {draw.status === 'ACTIVE' && onSelectWinners && (
                            <Button
                                onClick={() => onSelectWinners(draw.id)}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white h-10 rounded-xl font-black text-xs"
                            >
                                <Trophy className="w-3.5 h-3.5 mr-2" />
                                Select Winners
                            </Button>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
