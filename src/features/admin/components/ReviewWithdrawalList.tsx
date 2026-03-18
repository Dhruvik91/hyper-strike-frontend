"use client";

import { Withdrawal } from "@/constants/interface";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Check, X, User, Calendar, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

interface ReviewWithdrawalListProps {
    withdrawals: Withdrawal[];
    isLoading?: boolean;
    onReview: (id: string, status: 'APPROVED' | 'REJECTED', reason?: string) => void;
}

export function ReviewWithdrawalList({ withdrawals, isLoading, onReview }: ReviewWithdrawalListProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [rejectionReason, setRejectionReason] = useState("");

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 rounded-3xl bg-zinc-900/40 border border-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    if (withdrawals.length === 0) {
        return (
            <div className="text-center py-24 bg-zinc-900/20 rounded-3xl border border-white/5 border-dashed">
                <Landmark className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-zinc-500 font-bold">Payout queue is empty</h3>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <AnimatePresence>
                {withdrawals.map((withdrawal, index) => (
                    <motion.div
                        key={withdrawal.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-zinc-950/40 border border-white/5 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-white/[0.03] transition-all group"
                    >
                        <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 transition-colors">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-sm font-black text-white">
                                        {withdrawal.requester?.first_name ? `${withdrawal.requester.first_name} ${withdrawal.requester.last_name || ''}` : 'Striker #' + withdrawal.requester_id.slice(-4)}
                                    </h4>
                                    <span className="text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Verified</span>
                                </div>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Calendar className="w-3 h-3" />
                                    Requested {new Date(withdrawal.created_at).toLocaleDateString()}
                                </p>
                                <div className="mt-3 p-3 bg-black/40 rounded-xl border border-white/5 max-w-sm">
                                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                        <Landmark className="w-3 h-3" /> Wallet Address
                                    </p>
                                    <code className="text-xs text-blue-400 leading-relaxed whitespace-pre-line">
                                        {withdrawal.wallet_address}
                                    </code>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                            <div className="text-right">
                                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-1">Payout Quantum</p>
                                <p className="text-3xl font-black text-white italic tracking-tighter">{withdrawal.amount_requested} {withdrawal.crypto_currency}</p>
                            </div>

                            <div className="flex gap-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 h-11 rounded-xl px-4 font-black text-xs uppercase tracking-widest">
                                            <X className="w-3.5 h-3.5 mr-2" /> Reject
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-zinc-950 border-white/10">
                                        <DialogHeader>
                                            <DialogTitle className="text-white font-black uppercase">Deny Settlement</DialogTitle>
                                            <DialogDescription className="text-zinc-500">
                                                Please provide a reason for rejecting this withdrawal request. This will be visible to the user.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                            <textarea
                                                className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm text-white min-h-[100px] focus:ring-red-500/20"
                                                placeholder="e.g., Incorrect IFSC code, Suspicious activity, etc."
                                                value={rejectionReason}
                                                onChange={(e) => setRejectionReason(e.target.value)}
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button variant="ghost" className="text-zinc-500 font-bold" onClick={() => setRejectionReason("")}>Cancel</Button>
                                            <Button
                                                className="bg-red-600 hover:bg-red-500 text-white font-black"
                                                onClick={() => {
                                                    onReview(withdrawal.id, 'REJECTED', rejectionReason);
                                                    setRejectionReason("");
                                                }}
                                                disabled={!rejectionReason}
                                            >Confirm Reject</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <Button
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white h-11 rounded-xl px-6 font-black text-xs uppercase tracking-widest border-0 shadow-lg shadow-emerald-900/20"
                                    onClick={() => onReview(withdrawal.id, 'APPROVED')}
                                >
                                    <Check className="w-3.5 h-3.5 mr-2" /> Approve
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
