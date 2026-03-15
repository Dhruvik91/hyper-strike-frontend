"use client";

import { motion } from "framer-motion";
import { Ticket, Users, Wallet, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatItem {
  title: string;
  value: string;
  icon: any;
  trend: string;
  color: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl overflow-hidden relative group h-full">
            {/* Ambient background glow */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity rounded-full px-1 py-1 ${stat.color === 'text-emerald-400' ? 'bg-emerald-500' : stat.color === 'text-blue-400' ? 'bg-blue-500' : stat.color === 'text-purple-400' ? 'bg-purple-500' : 'bg-amber-500'}`} />
            
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                {stat.title}
              </CardTitle>
              <div className={`${stat.color} bg-white/5 p-2 rounded-lg`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-white tracking-tight">{stat.value}</div>
              <p className="text-[10px] font-bold text-zinc-500 mt-2 flex items-center gap-1.5 uppercase">
                <span className={stat.trend.includes('+') ? 'text-emerald-400' : 'text-zinc-500'}>
                  {stat.trend}
                </span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
