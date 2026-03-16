"use client";

import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ActivityItem {
  id: string | number;
  action: string;
  date: string;
  amount: string;
}


interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl h-full shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-zinc-400" />
          Recent Activity
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-xs font-bold text-zinc-500 hover:text-emerald-400 transition-colors uppercase tracking-wider">
          View History <ArrowUpRight className="ml-1 w-3 h-3" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.03] transition-all group border border-transparent hover:border-white/5"
            >
              <div className="flex items-center gap-4">
                <div className="bg-zinc-900 border border-white/5 p-2.5 rounded-xl text-zinc-500 group-hover:text-white group-hover:bg-zinc-800 transition-all shadow-lg">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">{activity.action}</p>
                  <p className="text-[10px] uppercase font-bold text-zinc-500 mt-0.5 tracking-wider">{activity.date}</p>
                </div>
              </div>
              <div className={`text-sm font-black italic tracking-tighter ${activity.amount.startsWith('+') ? 'text-emerald-400' : 'text-zinc-200'}`}>
                {activity.amount}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
