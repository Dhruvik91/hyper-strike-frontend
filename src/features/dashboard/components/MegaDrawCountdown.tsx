"use client";

import { motion } from "framer-motion";
import { Trophy, Ticket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MegaDrawCountdownProps {
  ticketCount: number;
}

export function MegaDrawCountdown({ ticketCount }: MegaDrawCountdownProps) {
  return (
    <Card className="bg-gradient-to-br from-indigo-950/40 via-blue-900/10 to-emerald-950/20 border-white/10 backdrop-blur-xl h-full relative overflow-hidden group shadow-2xl">
      {/* Decorative pulse background */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <CardHeader>
        <CardTitle className="text-2xl font-black text-white flex items-center gap-3">
          <div className="bg-amber-500/20 p-2 rounded-xl border border-amber-500/30">
            <Trophy className="w-6 h-6 text-amber-400" />
          </div>
          Mega Draw Event
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col items-center justify-center py-12 relative z-10">
        <div className="grid grid-cols-4 gap-4 md:gap-6 text-center mb-10">
          {[
            { label: "Days", val: "03" },
            { label: "Hrs", val: "14" },
            { label: "Min", val: "45" },
            { label: "Sec", val: "22", color: "text-emerald-400" }
          ].map((unit, i) => (
            <motion.div 
              key={unit.label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-black/60 rounded-[2rem] border border-white/10 backdrop-blur-2xl shadow-2xl group/unit hover:border-emerald-500/30 transition-all duration-500">
                <span className={`text-3xl md:text-5xl font-black tracking-tight ${unit.color || 'text-white'}`}>
                  {unit.val}
                </span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mt-3">{unit.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row items-center gap-5 bg-white/[0.03] p-6 rounded-3xl border border-white/10 w-full max-w-lg backdrop-blur-md shadow-xl"
        >
          <div className="bg-blue-500/20 p-4 rounded-2xl border border-blue-500/30">
            <Ticket className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-white font-bold text-lg mb-1">Boost Your Chances!</p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              You currently have <span className="text-white font-black underline decoration-emerald-500/50 underline-offset-4">{ticketCount} tickets</span> in the pool.
            </p>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
