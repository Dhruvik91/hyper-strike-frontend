"use client";

import { motion } from "framer-motion";
import { 
  Ticket, 
  Users, 
  Wallet, 
  Trophy,
  Copy,
  Zap 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatsGrid } from "@/features/dashboard/components/StatsGrid";
import { RecentActivity } from "@/features/dashboard/components/RecentActivity";
import { MegaDrawCountdown } from "@/features/dashboard/components/MegaDrawCountdown";
import { toast } from "sonner";

export default function DashboardPage() {
  // Logic: In a real app, these would comes from useQuery hooks
  const stats = [
    {
      title: "Active Tickets",
      value: "14",
      icon: Ticket,
      trend: "+2 purchased today",
      color: "text-blue-400"
    },
    {
      title: "Network Size",
      value: "128",
      icon: Users,
      trend: "+15 new members",
      color: "text-emerald-400"
    },
    {
      title: "Total Yield",
      value: "₹4,250",
      icon: Wallet,
      trend: "₹850 in pending vault",
      color: "text-purple-400"
    },
    {
      title: "Tournament Wins",
      value: "02",
      icon: Trophy,
      trend: "Ranked Top 5%",
      color: "text-amber-400"
    }
  ];

  const recentActivity = [
    { id: 1, action: "Purchased Ticket #HS-9921", date: "2 HOURS AGO", amount: "-₹500" },
    { id: 2, action: "Referral Bonus (John D.)", date: "5 HOURS AGO", amount: "+₹50" },
    { id: 3, action: "Withdrawal Completed", date: "1 DAY AGO", amount: "-₹2,000" },
    { id: 4, action: "Purchased Ticket #HS-8842", date: "3 DAYS AGO", amount: "-₹500" },
  ];

  const handleCopyReferral = () => {
    navigator.clipboard.writeText("https://hyperstrike.io/ref/USER123");
    toast.success("Link copied to clipboard!");
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
            Tracking your lucky streak and referral empire in real-time.
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
            className="flex-1 lg:flex-none border-white/10 bg-white/[0.02] text-zinc-300 hover:text-white hover:bg-white/10 h-12 rounded-xl px-6 font-bold"
          >
            <Copy className="w-4 h-4 mr-2" />
            Refer Link
          </Button>
          <Button className="flex-1 lg:flex-none bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black h-12 rounded-xl px-8 shadow-[0_0_20px_rgba(16,185,129,0.3)] border-0">
            <Ticket className="w-4 h-4 mr-2" />
            Launch Tickets
          </Button>
        </motion.div>
      </div>

      {/* Stats Section */}
      <StatsGrid stats={stats} />

      {/* Complex Layout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <MegaDrawCountdown ticketCount={14} />
        </div>
        <div className="lg:col-span-4">
          <RecentActivity activities={recentActivity} />
        </div>
      </div>
    </div>
  );
}
