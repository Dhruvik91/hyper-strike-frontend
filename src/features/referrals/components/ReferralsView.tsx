"use client";

import { motion } from "framer-motion";
import { Users, Share2, Copy, CheckCircle2, QrCode } from "lucide-react";
import { ReferralStats } from "./ReferralStats";
import { ReferralList } from "./ReferralList";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Referral, WalletBalance } from "@/constants/interface";

interface ReferralsViewProps {
    referralLink?: string;
    referrals: Referral[];
    totalReferrals: number;
    isReferralsLoading: boolean;
    wallet?: WalletBalance;
    isCopied: boolean;
    onCopy: () => void;
}

export function ReferralsView({
    referralLink,
    referrals,
    totalReferrals,
    isReferralsLoading,
    wallet,
    isCopied,
    onCopy
}: ReferralsViewProps) {
    return (
        <div className="space-y-12 pb-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-500/20 text-blue-400 p-2 rounded-xl border border-blue-500/20 shadow-lg">
                        <Users className="w-5 h-5 fill-current" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500/80">Affiliate Network</span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-white lg:text-6xl drop-shadow-2xl">
                    Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Empire</span>
                </h1>
                <p className="text-zinc-500 font-medium mt-4 max-w-xl text-lg leading-relaxed">
                    Unlock passive yields by expanding the HyperStrike network. Earn <span className="text-white font-bold">10% commission</span> on every ticket your squad launches.
                </p>
            </motion.div>

            {/* Sharing Tools */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 bg-gradient-to-br from-blue-600/10 via-zinc-950/40 to-black border-white/10 backdrop-blur-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Share2 className="w-40 h-40 text-blue-500" />
                    </div>
                    <CardContent className="p-8 relative z-10">
                        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                            <Share2 className="w-5 h-5 text-blue-400" />
                            Your Command Link
                        </h3>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 bg-black/60 border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between group">
                                <code className="text-blue-400 font-bold truncate mr-4">
                                    {referralLink || "Generating your link..."}
                                </code>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onCopy}
                                    className="text-zinc-500 hover:text-white transition-colors"
                                >
                                    {isCopied ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                                </Button>
                            </div>
                            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-black px-8 h-14 rounded-2xl shadow-xl shadow-blue-900/20 border-0 transition-transform hover:scale-[1.02] active:scale-[0.98]">
                                Broadcast Now
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl flex items-center justify-center p-8 group">
                    <div className="text-center">
                        <div className="bg-white p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                            <QrCode className="w-16 h-16 text-black" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Scan to Recruit</p>
                    </div>
                </Card>
            </section>

            {/* Stats */}
            <ReferralStats
                totalReferrals={totalReferrals}
                activeReferrals={Math.floor((totalReferrals) * 0.6)}
                commissionEarned={wallet?.commission_earned || 0}
            />

            {/* Network List */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-white tracking-tight uppercase">Squad Personnel</h2>
                    <Button variant="ghost" className="text-xs font-bold text-zinc-500 hover:text-blue-400 transition-colors uppercase tracking-widest">
                        View All Detailed Analytics
                    </Button>
                </div>
                <ReferralList referrals={referrals} isLoading={isReferralsLoading} />
            </section>
        </div>
    );
}
