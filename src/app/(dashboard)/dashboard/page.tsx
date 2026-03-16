"use client";

import { motion } from "framer-motion";
import {
  Ticket as TicketIcon,
  Users,
  Wallet,
  Trophy,
  Copy,
  Zap
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useProfileQuery } from "@/hooks/queries/use-auth";
import { useWalletBalanceQuery } from "@/hooks/queries/use-user";
import { useMyReferralLinkQuery, useMyReferralsQuery } from "@/hooks/queries/use-referrals";
import { useMyTicketsQuery } from "@/hooks/queries/use-tickets";
import { StatsGrid } from "@/features/dashboard/components/StatsGrid";
import { RecentActivity } from "@/features/dashboard/components/RecentActivity";
import { MegaDrawCountdown } from "@/features/dashboard/components/MegaDrawCountdown";
import { toast } from "sonner";
import { Ticket } from "@/constants/interface";


export default function DashboardPage() {
  const { data: user } = useProfileQuery();
  const { data: wallet, isLoading: isWalletLoading } = useWalletBalanceQuery();
  const { data: referralLink } = useMyReferralLinkQuery();
  const { data: ticketsResponse } = useMyTicketsQuery(1, 10);
  const { data: referralsResponse } = useMyReferralsQuery(1, 10);

  const stats = [
    {
      title: "Active Tickets",
      value: ticketsResponse?.total?.toString() || "0",
      icon: TicketIcon,
      trend: "Total collection",
      color: "text-blue-400"
    },
    {
      title: "Network Size",
      value: referralsResponse?.total?.toString() || "0",
      icon: Users,
      trend: "Direct referrals",
      color: "text-emerald-400"
    },
    {
      title: "Wallet Balance",
      value: `₹${wallet?.balance || 0}`,
      icon: Wallet,
      trend: `₹${wallet?.commission_earned || 0} earned`,
      color: "text-purple-400"
    },
    {
      title: "Tournament Wins",
      value: "0",
      icon: Trophy,
      trend: "Lucky Draw History",
      color: "text-amber-400"
    }
  ];

  const recentActivity = ticketsResponse?.items?.map((ticket: Ticket) => ({
    id: ticket.id,
    action: `Purchased Ticket #${ticket.ticket_number}`,
    date: new Date(ticket.created_at).toLocaleDateString(),
    amount: `-₹${ticket.purchase_price_inr}`
  })) || [];


  const handleCopyReferral = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied!");
    } else {
      toast.error("Referral link not available");
    }
  };

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
            <div className="bg-emerald-500/20 text-emerald-400 p-1.5 rounded-md">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/80">Active Session</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-2xl">
            Command Center
          </h1>
          <p className="text-zinc-500 font-medium mt-1">
            Welcome back, <span className="text-white">{user?.first_name || 'Striker'}</span>. Tracking your stats in real-time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-3 w-full lg:w-auto"
        >
          <Button
            variant="outline"
            onClick={handleCopyReferral}
            disabled={!referralLink}
            className="flex-1 lg:flex-none border-white/10 bg-white/[0.02] text-zinc-300 hover:text-white hover:bg-white/10 h-12 rounded-xl px-6 font-bold"
          >
            <Copy className="w-4 h-4 mr-2" />
            Refer Link
          </Button>
          <Button className="flex-1 lg:flex-none bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black h-12 rounded-xl px-8 shadow-[0_0_20px_rgba(16,185,129,0.3)] border-0">
            <TicketIcon className="w-4 h-4 mr-2" />
            Launch Tickets
          </Button>
        </motion.div>
      </div>

      {/* Stats Section */}
      <StatsGrid stats={stats} />

      {/* Complex Layout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <MegaDrawCountdown ticketCount={ticketsResponse?.total || 0} />
        </div>
        <div className="lg:col-span-4">
          <RecentActivity activities={recentActivity.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
}

