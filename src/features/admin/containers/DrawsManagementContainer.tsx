"use client";

import { useState } from "react";
import { useAllDrawsQuery } from "@/hooks/queries/use-draws";
import { useSelectWinnersMutation } from "@/hooks/queries/use-super-admin";
import { DrawsList } from "../components/DrawsList";
import { CreateDrawDialog } from "../components/CreateDrawDialog";
import { motion } from "framer-motion";
import { Trophy, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DrawsManagementContainer() {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const { data: drawsResponse, isLoading } = useAllDrawsQuery(page, 20);
    const selectWinnersMutation = useSelectWinnersMutation();

    const handleSelectWinners = (drawId: string) => {
        if (confirm("Are you sure you want to automatically select winners for this draw?")) {
            selectWinnersMutation.mutate(drawId);
        }
    };

    const filteredDraws = drawsResponse?.items?.filter((draw) => {
        if (statusFilter === "ALL") return true;
        return draw.status === statusFilter;
    }) || [];

    return (
        <div className="space-y-10 pb-16">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-purple-500/20 text-purple-400 p-1.5 rounded-md">
                            <Trophy className="w-4 h-4 fill-current" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500/80">
                            Draw Management
                        </span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-2xl">
                        Lottery Draws
                    </h1>
                    <p className="text-zinc-500 font-medium mt-1">
                        Schedule draws, manage winners, and oversee lottery operations.
                    </p>
                </motion.div>

                <CreateDrawDialog />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-zinc-400">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-bold uppercase tracking-wider">Filter:</span>
                </div>
                {["ALL", "UPCOMING", "ACTIVE", "COMPLETED"].map((status) => (
                    <Button
                        key={status}
                        variant={statusFilter === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter(status)}
                        className={`h-9 rounded-xl px-4 font-black text-xs uppercase tracking-widest ${
                            statusFilter === status
                                ? "bg-purple-600 hover:bg-purple-500 text-white border-0"
                                : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
                        }`}
                    >
                        {status}
                    </Button>
                ))}
            </div>

            {/* Draws List */}
            <DrawsList
                draws={filteredDraws}
                isLoading={isLoading}
                onSelectWinners={handleSelectWinners}
            />

            {/* Pagination */}
            {drawsResponse && drawsResponse.total > 20 && (
                <div className="flex justify-center gap-2 pt-6">
                    <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                    >
                        Previous
                    </Button>
                    <span className="flex items-center px-4 text-sm font-bold text-zinc-400">
                        Page {page} of {Math.ceil(drawsResponse.total / 20)}
                    </span>
                    <Button
                        variant="outline"
                        disabled={page >= Math.ceil(drawsResponse.total / 20)}
                        onClick={() => setPage(page + 1)}
                        className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}
