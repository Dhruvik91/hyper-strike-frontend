"use client";

import { Draw } from "@/constants/interface";
import { DrawCard } from "./DrawCard";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface DrawListProps {
    draws: Draw[];
    isLoading?: boolean;
}

export function DrawList({ draws, isLoading }: DrawListProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-[300px] rounded-3xl bg-zinc-900/40 border border-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    if (draws.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-zinc-900 p-6 rounded-3xl border border-white/5 mb-6">
                    <Trophy className="w-12 h-12 text-zinc-700" />
                </div>
                <h3 className="text-xl font-black text-white mb-2">No active draws yet</h3>
                <p className="text-zinc-500 max-w-xs">
                    New lucky draws are scheduled every week. Stay tuned for the next strike!
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {draws.map((draw, index) => (
                <DrawCard key={draw.id} draw={draw} />
            ))}
        </div>
    );
}
